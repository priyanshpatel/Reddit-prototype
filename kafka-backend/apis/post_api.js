const Posts = require("../models/PostsModel");
const ObjectId = require("mongoose").Types.ObjectId;

const createPost = async (req, callback) => {
  // Check here whether the user is a member of the community or not
  // LEFT.....................................

  let rawPost = null;

  if (req.body.type === "text") {
    rawPost = {
      type: "text",
      description: req.body.description,
    };
  } else if (req.body.type === "image") {
    // Getting all the paths of images in a single array
    const imagePathArray = [];
    await req.files.forEach((image) => {
      imagePathArray.push(image.path.substring(image.path.indexOf("/") + 1));
    });

    rawPost = {
      type: "image",
      images: imagePathArray,
    };
  } else if (req.body.type === "link") {
    rawPost = {
      type: "text",
      description: req.body.description,
      link: req.body.link,
    };
  }

  rawPost.community = req.body.community_id;
  rawPost.createdBy = req.user._id;
  rawPost.comments = [];
  rawPost.numberOfComments = 0;
  rawPost.title = req.body.title;
  const post = await new Posts(rawPost).save();
  callback(null, {
    post: {
      _id: post._id,
      votes: post.votes,
      numberOfComments: post.numberOfComments,
      images: post.images,
      type: post.type,
      title: post.title,
      description: post.description,
      link: post.link,
      community_id: post.community,
      createdByUserName: req.user.name,
      createdByUser_id: post.createdBy,
      comments: [],
      createdAt: post.createdAt,
    },
    success: true,
  });
};

const createComment = async (req, callback) => {
  // Check whether user is a member of the community or not
  // LEFT......................................

  // Find the post
  const rawPost = await Posts.findById(req.body.post_id);
  if (rawPost != null && rawPost.community.equals(req.body.community_id)) {
    let rawComment = null;
    if (!req.body.parent_id) {
      rawComment = {
        description: req.body.description,
      };
      rawPost.numberOfComments += 1;
    } else {
      // Find parent comment from post
      const parentComment = rawPost.comments.filter((comment) => {
        if (ObjectId(comment._id).equals(ObjectId(req.body.parent_id))) {
          return true;
        }
      });

      // If we don't find parent comment successfully
      if (!parentComment) {
        callback(null, {
          errorMessage: "Select a valid Parent Comment.",
          success: false,
        });
        return;
      } else {
        rawComment = {
          description: req.body.description,
          depth: parentComment[0].depth + 1,
          parent_id: req.body.parent_id,
        };
      }
    }

    // Saving the comment and post
    rawComment.createdBy = req.user._id;
    rawPost.comments.push(rawComment);
    const post = await rawPost.save();

    // Accessing last added comment
    const comment = post.comments[post.comments.length - 1];

    callback(null, {
      comment: {
        _id: comment._id,
        post_id: req.body.post_id,
        community_id: req.body.community_id,
        parent_id: comment.parent_id,
        comment: comment.description,
        commentedByUser_id: req.user._id,
        commentedByUserName: req.user.name,
        createdAt: comment.createdAt,
      },
      success: true,
    });
    return;
  } else {
    callback(null, {
      errorMessage: "Select a valid Post or Comment.",
      success: false,
    });
    return;
  }
};

module.exports = { createPost, createComment };
