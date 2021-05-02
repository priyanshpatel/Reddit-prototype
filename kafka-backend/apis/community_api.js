import { createError } from "../helper/error";
import config from "../config/config";
const CommunityModel = require("../models/communityModel");
const PostsModel = require("../models/PostsModel");
const mongoose = require("mongoose");
const UsersModel = require("../models/UsersModel");
const PostsVotesModel = require("../models/PostsVotesModel");
const CommentsVotesModel = require("../models/CommentsVotesModel");
const ObjectId = require("mongodb").ObjectID;

export async function createCommunity(message, callback) {
  let response = {};
  console.log("Inside create user post Request");
  let community = message.body.community;
  console.log("Community Creation ", JSON.stringify(community));
  try {
    community = await insertCommunity(community);
    const user = await updateCreatorsCommunityList(
      community.creator,
      community._id
    );
  } catch (error) {
    console.log("error in creting community", JSON.stringify(error));

    let err = createError(
      500,
      "Unable to create community. Please check application logs for more detail."
    );
    console.log("Error code ", error.code);

    if (error.code == 11000) {
      err = createError(
        400,
        "Community name already exists. Please enter unique name."
      );
    }
    return callback(err, null);
  }

  response.status = 200;
  response.data = community;
  return callback(null, response);
}

export async function updateExistingCommunity(message, callback) {
  let response = {};
  let err = {};
  console.log("Inside update community post Request api");
  let community = message.body.community;
  console.log("Community Updation ", JSON.stringify(community));
  try {
    const storedCommunity = await getCommunityByObjectID(community._id);

    if (!storedCommunity) {
      err = createError(
        400,
        "Community ID invalid. Please provide correct community ID to update"
      );
      return callback(err, null);
    } else {
      community = await updateCommunity(community);
    }
  } catch (error) {
    console.log("error in update", error);
    err.status = 500;
    err.data = {
      code: err.code,
      msg:
        "Unable to successfully update the community! Please check the application logs for more details.",
    };
    return callback(err, null);
  }
  response.status = 200;
  response.data = community;
  console.log("response for update ", community);
  return callback(null, response);
}

async function getCommunityByObjectID(communityId) {
  const community = CommunityModel.findOne({ _id: communityId });
  return community;
}

async function updateCommunity(community) {
  console.log("Inside update community");
  const value = await CommunityModel.findOneAndUpdate(
    { _id: ObjectId(community._id) },
    { ...community },
    { new: true }
  );
  await value.save();
  return value;
}

// Function to fetch communities of whom the user is a part of by userId
export async function getAllCommunityForUser(message, callback) {
  let response = {};
  let error = {};
  const userId = message.userId;

  console.log("Inside get all community list Request");
  try {
    const communities = await getCommunityByUserId(userId);

    console.log("communitiesX ", JSON.stringify(communities));
    return callback(null, { status: 200, data: communities });
  } catch (err) {
    console.log(err);
    error.status = 500;
    error.data = {
      code: err.code,
      msg:
        "Unable to successfully get all the Communities! Please check the application logs for more details.",
    };
    return callback(error, null);
  }
}

// Function to fetch communities of whom the user is a part of by userId
async function getCommunityByUserId(userId) {
  console.log("Inside get Community By User ID XX ", userId);
  const result = await CommunityModel.find({
    members: { $elemMatch: { _id: userId } },
  })
    .populate("members._id")
    .populate("creator")
    .populate("posts");
  console.log("ResultsX ", JSON.stringify(result));
  return result;
}

// Function to get all the community details
export async function getCommunityDetails(message, callback) {
  let response = {};
  let error = {};
  console.log("inside get community details", message.communityId);
  let communityId = message.communityId;
  console.log("Inside get communityId details Request");
  try {
    const communityDetail = await getCommunityById(communityId);
    response.status = 200;
    response.data = communityDetail;
    return callback(response, null);
  } catch (err) {
    console.log(err);
    error.status = 500;
    error.data = {
      code: err.code,
      msg:
        "Unable to successfully get the Community! Please check the application logs for more details.",
    };
    return callback(error, null);
  }
}

// TODO :- MINIMIZE TIME TAKEN BY THIS METHOD EITHER BY CACHING OR BY FINDING A METHOD TO POPULATE USER_IDS
// Get all posts with nested comements
export const getAllPosts = async (req, callback) => {
  const pageSize = req.query.pageSize || config.defaultPageSizePosts;
  const pageNumber = req.query.pageNumber;

  const customLabels = {
    totalDocs: "numberOfPosts",
    docs: "posts",
    limit: "pageSize",
    page: "pageNumber",
  };

  const options = {
    page: pageNumber,
    limit: pageSize,
    customLabels,
  };

  const orderByDateIdentifier =
    !req.query.orderByDate || req.query.orderByDate == 1 ? -1 : 1;

  let postsAggregateQuery = null;
  if (!req.query.orderByPopularity || req.query.orderByPopularity == 0) {
    postsAggregateQuery = PostsModel.aggregate([
      { $match: { community: ObjectId(req.query.community_id) } },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          "user.topics": 0,
          "user.password": 0,
        },
      },
      { $sort: { createdAt: orderByDateIdentifier } },
    ]);
  } else {
    const orderByPopularityIdentifier =
      req.query.orderByPopularity == 1 ? -1 : 1;
    postsAggregateQuery = PostsModel.aggregate([
      { $match: { community: ObjectId(req.query.community_id) } },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          "user.topics": 0,
          "user.password": 0,
        },
      },
      {
        $sort: {
          votes: orderByPopularityIdentifier,
          createdAt: orderByDateIdentifier,
        },
      },
    ]);
  }

  const posts = await PostsModel.aggregatePaginate(
    postsAggregateQuery,
    options
  );

  const finalPosts = await populateVotesAndCommentsOfPosts(
    posts.posts,
    req.user._id,
    orderByDateIdentifier
  );
  callback(null, {
    posts: finalPosts,
    totalPosts: posts.numberOfPosts,
    pageSize: posts.pageSize,
    pageNumber: posts.pageNumber,
    totalPages: posts.totalPages,
    hasNextPage: posts.hasNextPage,
    hasPrevPage: posts.hasPrevPage,
    nextPage: posts.nextPage,
    prevPage: posts.prevPage,
    success: true,
  });
};

// Return a paginated response of all the communities created by the user
export const getAllCreatedCommunities = async (req, callback) => {
  const pageSize =
    req.query.pageSize || config.defaultPageSizeCommunityModeration;
  const pageNumber = req.query.pageNumber;
  const searchKeyword = req.query.searchKeyword;
  let totalPages = 0;
  let countPages = null;
  let loggedInUser;

  // Order by descending order
  const orderByDateInDescending = -1;
  if (searchKeyword) {
    // Count the total number of pages
    countPages = await CommunityModel.aggregate([
      {
        $match: {
          $and: [
            { creator: mongoose.Types.ObjectId(req.user._id) },
            { communityName: { $regex: searchKeyword + ".*" } },
          ],
        },
      },
      {
        $count: "totalDocuments",
      },
    ]);

    // Populate the communnities created by user
    loggedInUser = await UsersModel.findById(
      req.user._id,
      "createdCommunities"
    ).populate({
      path: "createdCommunities",
      select: "communityName communityAvatar",
      options: {
        sort: {
          createdAt: orderByDateInDescending,
        },
        skip: (pageNumber - 1) * pageSize,
        limit: pageSize,
      },
      match: {
        communityName: { $regex: searchKeyword + ".*" },
      },
    });
  } else {
    countPages = await CommunityModel.aggregate([
      {
        $match: { creator: mongoose.Types.ObjectId(req.user._id) },
      },
      {
        $count: "totalDocuments",
      },
    ]);

    loggedInUser = await UsersModel.findById(
      req.user._id,
      "createdCommunities"
    ).populate({
      path: "createdCommunities",
      select: "communityName",
      options: {
        sort: {
          createdAt: orderByDateInDescending,
        },
        skip: (pageNumber - 1) * pageSize,
        limit: pageSize,
      },
    });
  }
  if (countPages && countPages.length != 0)
    totalPages = Math.ceil(countPages[0].totalDocuments / pageSize);
  callback(null, {
    communities: loggedInUser.createdCommunities,
    totalPages,
    success: true,
  });
};

// HELPER FUNCTIONS

// Create a new community
async function insertCommunity(community) {
  console.log("Inside insert Community");
  var community = new CommunityModel(community);
  return await community.save();
}

// Get community details by community_id
async function getCommunityById(communityId) {
  const community = await CommunityModel.findOne({ _id: communityId })
    .populate("members._id")
    .populate("creator")
    .populate("posts");
  return community;
}

// Update users createdCommunities Array
async function updateCreatorsCommunityList(userId, communityId) {
  // Find the user
  const user = await UsersModel.findById(userId);
  if (user) {
    // Update the user's createdCommuity array if you find it successfully
    user.createdCommunities.push(communityId);
    return await user.save();
  } else {
    return null;
  }
}

// Populate the votes of posts and nested comments along with their votes
const populateVotesAndCommentsOfPosts = async (
  posts,
  user_id,
  orderByDateIdentifier
) => {
  const finalPosts = [];
  for (let index = 0; index < posts.length; index++) {
    let voteStatus = 0;
    const postVote = await PostsVotesModel.findOne({
      post_id: posts[index]._id,
      createdBy: user_id,
    });
    if (postVote != null) {
      voteStatus = postVote.vote;
    }
    posts[index].comments = await organizeComments(
      posts[index].comments,
      user_id,
      posts[index]._id,
      orderByDateIdentifier
    );
    posts[index].voteStatus = voteStatus;
    finalPosts.push({
      ...posts[index],
    });
  }
  return finalPosts;
};

// Populate only the votes of parent comment
const populateVoteOfParentComment = async (post_id, comment_id, user_id) => {
  const commentVote = await CommentsVotesModel.findOne({
    comment_id,
    post_id,
    createdBy: user_id,
  });
  let voteStatus = 0;
  if (commentVote != null) {
    voteStatus = commentVote.voteStatus;
  }
  return voteStatus;
};

// Function which organizes the comments in a nested fashion. This is the starting
// point to the recursive solution of nested comments
const organizeComments = async (
  commentsArray,
  user_id,
  post_id,
  orderByDateIdentifier
) => {
  let threads = {};
  let comment = null;
  for (let index = 0; index < commentsArray.length; index++) {
    comment = commentsArray[index];
    comment["children"] = {};
    if (commentsArray[index].depth == 0) {
      comment.voteStatus = await populateVoteOfParentComment(
        post_id,
        commentsArray[index]._id,
        user_id
      );
      comment.user = await populateUser(comment.createdBy);
      threads[comment._id] = comment;
      continue;
    }
    await organizeChildComments(comment, threads);
  }
  threads = getSortedCommentsArray(threads, orderByDateIdentifier);
  return threads;
};

// Recursive function used to organize comments in the nested manner.
const organizeChildComments = async (comment, threads) => {
  for (let thread in threads) {
    const currentParent = threads[thread];
    if (ObjectId(thread).equals(ObjectId(comment.parent_id))) {
      comment.user = await populateUser(comment.createdBy);
      currentParent.children[comment._id] = comment;
      return;
    }
    if (currentParent.children) {
      organizeChildComments(comment, currentParent.children);
    }
  }
};

// Function which sorts the parent comment on the basis of popularity. If there is a tie
// It is broken by createdAt value
const getSortedCommentsArray = (commentsObject, orderByDateIdentifier) => {
  const sortCommentsByVotesAndDate = (a, b) => {
    // Sort by most popular
    if (a.votes > b.votes) {
      return -1;
    } else if (b.votes > a.votes) {
      return 1;
    } else {
      // Sort the ties using date
      const d1 = new Date(a.createdAt);
      const d2 = new Date(b.createdAt);
      if (d1 > d2) {
        return orderByDateIdentifier;
      } else if (d1 < d2) {
        return orderByDateIdentifier;
      } else {
        return 0;
      }
    }
  };
  const sortedCommentsArray = Object.values(commentsObject).sort(
    sortCommentsByVotesAndDate
  );
  return sortedCommentsArray;
};

// Populates the user data for each and every comment
const populateUser = async (user_id) => {
  return await UsersModel.findById(user_id, "name email handle avatar");
};
