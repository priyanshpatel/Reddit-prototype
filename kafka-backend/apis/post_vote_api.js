// Upvote Post
const Posts = require("../models/PostsModel");
const PostsVotes = require("../models/PostsVotesModel");
const CommentsVotes = require("../models/CommentsVotesModel");
const ObjectId = require("mongoose").Types.ObjectId;

const upvotePost = async (req, callback) => {
  // TODO :- Check whether user is a member of the community or not

  // Find the post
  const rawPost = await Posts.findById(req.body.post_id);

  // Check whether the post is valid or not
  if (
    !rawPost ||
    !ObjectId(rawPost.community).equals(ObjectId(req.body.community_id))
  ) {
    callback(null, {
      errorMessage: ["Select a valid post and community."],
      success: false,
    });
    return;
  }
  // Find the vote if it exists
  const rawVote = await PostsVotes.findOne({
    post_id: req.body.post_id,
    createdBy: req.user._id,
  });
  // If the vote does not exist
  if (!rawVote) {
    // Create the vote
    await new PostsVotes({
      post_id: req.body.post_id,
      createdBy: req.user._id,
      vote: 1,
    }).save();
    // Increment the number of vote
    rawPost.votes += 1;
    const updatedPost = await rawPost.save();
    callback(null, {
      post: {
        _id: updatedPost._id,
        votes: updatedPost.votes,
        voteStatus: 1,
      },
      success: true,
    });
    return;
  } else {
    // If the vote exists but its neither upvoted or downvoted
    if (!rawVote || rawVote.vote === 0) {
      // Update vote
      rawVote.vote = 1;
      await rawVote.save();
      // Increment the number of votes by 1
      rawPost.votes += 1;
      const updatedPost = await rawPost.save();
      callback(null, {
        post: {
          _id: updatedPost._id,
          votes: updatedPost.votes,
          voteStatus: 1,
        },
        success: true,
      });
      return;
    }
    // If the vote exists and is already upvoted
    else if (rawVote.vote === 1) {
      // Update vote
      rawVote.vote = 0;
      await rawVote.save();
      // Decrease the number of votes
      rawPost.votes -= 1;
      const updatedPost = await rawPost.save();
      callback(null, {
        post: {
          _id: updatedPost._id,
          votes: updatedPost.votes,
          voteStatus: 0,
        },
        success: true,
      });
      return;
    }

    // If the vote exists and is already downvoted
    else if (rawVote.vote === -1) {
      // Update vote
      // Update vote
      rawVote.vote = 1;
      await rawVote.save();
      // Increase the number of votes by 2
      rawPost.votes += 2;
      const updatedPost = await rawPost.save();
      callback(null, {
        post: {
          _id: updatedPost._id,
          votes: updatedPost.votes,
          voteStatus: 1,
        },
        success: true,
      });
      return;
    }
  }
};
// Downvote Post
const downvotePost = async (req, callback) => {
  // TODO :- Check whether user is a member of the community or not

  // Find the post
  const rawPost = await Posts.findById(req.body.post_id);

  // Check whether the post is valid or not
  if (
    !rawPost ||
    !ObjectId(rawPost.community).equals(ObjectId(req.body.community_id))
  ) {
    callback(null, {
      errorMessage: ["Select a valid post and community."],
      success: false,
    });
    return;
  }
  // Find the vote if it exists
  const rawVote = await PostsVotes.findOne({
    post_id: req.body.post_id,
    createdBy: req.user._id,
  });
  // If the vote does not exist
  if (!rawVote) {
    // Create the vote
    await new PostsVotes({
      post_id: req.body.post_id,
      createdBy: req.user._id,
      vote: -1,
    }).save();
    // Decrement the number of vote
    rawPost.votes -= 1;
    const updatedPost = await rawPost.save();
    callback(null, {
      post: {
        _id: updatedPost._id,
        votes: updatedPost.votes,
        voteStatus: -1,
      },
      success: true,
    });
    return;
  } else {
    // If the vote exists but its neither upvoted or downvoted
    if (!rawVote || rawVote.vote === 0) {
      // Update vote
      rawVote.vote = -1;
      await rawVote.save();
      // Decrement the number of votes by 1
      rawPost.votes -= 1;
      const updatedPost = await rawPost.save();
      callback(null, {
        post: {
          _id: updatedPost._id,
          votes: updatedPost.votes,
          voteStatus: -1,
        },
        success: true,
      });
      return;
    }
    // If the vote exists and is already downvoted
    else if (rawVote.vote === -1) {
      // Update vote
      rawVote.vote = 0;
      await rawVote.save();
      // Decrease the number of votes
      rawPost.votes += 1;
      const updatedPost = await rawPost.save();
      callback(null, {
        post: {
          _id: updatedPost._id,
          votes: updatedPost.votes,
          voteStatus: 0,
        },
        success: true,
      });
      return;
    }

    // If the vote exists and is already upvoted
    else if (rawVote.vote === 1) {
      // Update vote
      rawVote.vote = -1;
      await rawVote.save();
      // Increase the number of votes by 2
      rawPost.votes -= 2;
      const updatedPost = await rawPost.save();
      callback(null, {
        post: {
          _id: updatedPost._id,
          votes: updatedPost.votes,
          voteStatus: -1,
        },
        success: true,
      });
      return;
    }
  }
};

module.exports = {
  upvotePost,
  downvotePost,
};
