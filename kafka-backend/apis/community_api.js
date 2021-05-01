import { createError } from "../helper/error";
import config from "../config/config";
const CommunityModel = require("../models/communityModel");
const PostsModel = require("../models/PostsModel");
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
  } catch (error) {
    console.log("error in creting community", JSON.stringify(error));

    let err = createError(
      500,
      "Unable to create community. Please check application logs for more detail."
    );
    console.log("Error code ", error.code);

    if (error.code == 11000) {
      console.log("comming here");
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

async function insertCommunity(community) {
  console.log("Inside insert Community");
  var community = new CommunityModel(community);
  return await community.save();
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
      { $sort: { createdAt: orderByDateIdentifier } },
    ]);
  } else {
    const orderByPopularityIdentifier =
      req.query.orderByPopularity == 1 ? -1 : 1;
    postsAggregateQuery = PostsModel.aggregate([
      { $match: { community: ObjectId(req.query.community_id) } },
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

async function getCommunityById(communityId) {
  const community = await CommunityModel.findOne({ _id: communityId })
    .populate("members._id")
    .populate("creator")
    .populate("posts");
  return community;
}

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
      threads[comment._id] = comment;
      continue;
    }
    organizeChildComments(comment, threads);
  }
  threads = getSortedCommentsArray(threads, orderByDateIdentifier);
  return threads;
};

const organizeChildComments = (comment, threads) => {
  for (let thread in threads) {
    const currentParent = threads[thread];
    if (ObjectId(thread).equals(ObjectId(comment.parent_id))) {
      currentParent.children[comment._id] = comment;
      return;
    }
    if (currentParent.children) {
      organizeChildComments(comment, currentParent.children);
    }
  }
};

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
