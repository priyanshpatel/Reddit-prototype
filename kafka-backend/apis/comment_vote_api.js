const CommentsVotes = require("../models/CommentsVotesModel");
const ObjectId = require("mongoose").Types.ObjectId;
const Posts = require("../models/PostsModel");

// Upvote Comment
const upvoteComment = async (req, callback) => {
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

  // Find Comment Index
  const commentIndex = rawPost.comments.findIndex((comment) =>
    ObjectId(comment._id).equals(ObjectId(req.body.comment_id))
  );

  // If we cannot find the comment
  if (commentIndex === -1) {
    callback(null, {
      errorMessage: ["Select a valid parent comment to vote."],
      success: false,
    });
    return;
  }

  // Find the vote if it exists
  const rawVote = await CommentsVotes.findOne({
    post_id: req.body.post_id,
    comment_id: req.body.comment_id,
    createdBy: req.user._id,
  });

  if (!rawVote) {
    // Check whether comment is a parent comment or not
    if (rawPost.comments[commentIndex].depth !== 0) {
      callback(null, {
        errorMessage: ["Select a valid parent comment to vote."],
        success: false,
      });
      return;
    } else {
      await new CommentsVotes({
        post_id: req.body.post_id,
        comment_id: req.body.comment_id,
        createdBy: req.user._id,
        vote: 1,
      }).save();
      rawPost.comments[commentIndex].votes += 1;
      const updatedPost = await rawPost.save();
      callback(null, {
        comment: {
          _id: updatedPost.comments[commentIndex]._id,
          votes: updatedPost.comments[commentIndex].votes,
          voteStatus: 1,
          post_id: req.body.post_id,
        },
        success: true,
      });
    }
    callback(null, {
      comment: rawPost.comments[commentIndex],
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
      rawPost.comments[commentIndex].votes += 1;
      const updatedPost = await rawPost.save();
      callback(null, {
        comment: {
          _id: updatedPost.comments[commentIndex]._id,
          votes: updatedPost.comments[commentIndex].votes,
          voteStatus: 1,
          post_id: req.body.post_id,
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
      rawPost.comments[commentIndex].votes -= 1;
      const updatedPost = await rawPost.save();
      callback(null, {
        comment: {
          _id: updatedPost.comments[commentIndex]._id,
          votes: updatedPost.comments[commentIndex].votes,
          voteStatus: 0,
          post_id: req.body.post_id,
        },
        success: true,
      });
      return;
    }
    // If the vote exists and is already downvoted
    else if (rawVote.vote === -1) {
      // Update vote
      rawVote.vote = 1;
      await rawVote.save();
      // Increase the number of votes by 2
      rawPost.comments[commentIndex].votes += 2;
      const updatedPost = await rawPost.save();
      callback(null, {
        comment: {
          _id: updatedPost.comments[commentIndex]._id,
          votes: updatedPost.comments[commentIndex].votes,
          voteStatus: 1,
          post_id: req.body.post_id,
        },
        success: true,
      });
      return;
    }
  }
};
// Downvote Comment
const downvoteComment = async (req, callback) => {
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

  // Find Comment Index
  const commentIndex = rawPost.comments.findIndex((comment) =>
    ObjectId(comment._id).equals(ObjectId(req.body.comment_id))
  );

  // If we cannot find the comment
  if (commentIndex === -1) {
    callback(null, {
      errorMessage: ["Select a valid parent comment to vote."],
      success: false,
    });
    return;
  }

  // Find the vote if it exists
  const rawVote = await CommentsVotes.findOne({
    post_id: req.body.post_id,
    comment_id: req.body.comment_id,
    createdBy: req.user._id,
  });

  if (!rawVote) {
    // Check whether comment is a parent comment or not
    if (rawPost.comments[commentIndex].depth !== 0) {
      callback(null, {
        errorMessage: ["Select a valid parent comment to vote."],
        success: false,
      });
      return;
    } else {
      await new CommentsVotes({
        post_id: req.body.post_id,
        comment_id: req.body.comment_id,
        createdBy: req.user._id,
        vote: -1,
      }).save();
      rawPost.comments[commentIndex].votes -= 1;
      const updatedPost = await rawPost.save();
      callback(null, {
        comment: {
          _id: updatedPost.comments[commentIndex]._id,
          votes: updatedPost.comments[commentIndex].votes,
          voteStatus: -1,
          post_id: req.body.post_id,
        },
        success: true,
      });
    }
    callback(null, {
      comment: rawPost.comments[commentIndex],
      success: true,
    });
    return;
  } else {
    // If the vote exists but its neither upvoted or downvoted
    if (!rawVote || rawVote.vote === 0) {
      // Update vote
      rawVote.vote -= 1;
      await rawVote.save();
      // Increment the number of votes by 1
      rawPost.comments[commentIndex].votes -= 1;
      const updatedPost = await rawPost.save();
      callback(null, {
        comment: {
          _id: updatedPost.comments[commentIndex]._id,
          votes: updatedPost.comments[commentIndex].votes,
          voteStatus: -1,
          post_id: req.body.post_id,
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
      rawPost.comments[commentIndex].votes += 1;
      const updatedPost = await rawPost.save();
      callback(null, {
        comment: {
          _id: updatedPost.comments[commentIndex]._id,
          votes: updatedPost.comments[commentIndex].votes,
          voteStatus: 0,
          post_id: req.body.post_id,
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
      rawPost.comments[commentIndex].votes -= 2;
      const updatedPost = await rawPost.save();
      callback(null, {
        comment: {
          _id: updatedPost.comments[commentIndex]._id,
          votes: updatedPost.comments[commentIndex].votes,
          voteStatus: -1,
          post_id: req.body.post_id,
        },
        success: true,
      });
      return;
    }
  }
};

module.exports = {
  upvoteComment,
  downvoteComment,
};
