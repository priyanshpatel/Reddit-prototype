const express = require("express");
const { checkAuth } = require("../Utils/passport");
const postSchema = require("../dataSchema/postSchema");
const commentSchema = require("../dataSchema/commentSchema");
const postVoteSchema = require("../dataSchema/postVoteSchema");
const commentVoteSchema = require("../dataSchema/commentVoteSchema");
const kafka = require("../kafka/client");
const ObjectId = require("mongoose").Types.ObjectId;
const multer = require("multer");
const path = require("path");
const { kafka_response_handler } = require("../kafka/handler.js");
// Initializing router
const router = express.Router();

// Using multer to store images

// Initializing storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/posts/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "_" +
        req.user._id +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

// Middleware to upload images where the image size should be less than 5MB
const uploadPostImages = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

// Create Post
const createPost = async (req, res) => {
  // Validate the input fields
  const result = await postSchema.validate(req.body);
  if (result.error) {
    res.status(400).send({ errorMessage: [result.error.details[0].message] });
    return;
  }

  // Check whether communityId is valid or not
  if (!ObjectId.isValid(req.body.community_id)) {
    res.status(400).send({ errorMessage: ["Select a valid community."] });
    return;
  }

  // Checks for different type
  if (req.body.type === "text") {
    // TODO :- Better implementation with JOI
    // Link :- https://stackoverflow.com/questions/59861503/joi-validator-conditional-schema

    if (!req.body.description || req.body.description.trim().length === 0) {
      res.status(400).send({ errorMessage: ["Enter a valid description."] });
      return;
    }
  } else if (req.body.type === "image") {
    if (!req.files || req.files.length === 0) {
      res.status(400).send({ errorMessage: ["Please upload an image."] });
      return;
    }
  } else if (req.body.type === "link") {
    if (!req.body.link || req.body.link.trim().length === 0) {
      res.status(400).send({ errorMessage: ["Enter a valid url."] });
      return;
    }
  }
  // Kafka make request call
  kafka.make_request(
    "reddit-post-topic",
    { path: "post_create", body: req.body, files: req.files, user: req.user },
    (err, results) =>
      kafka_response_handler(res, err, results, (result) => {
        return res.status(200).send(result);
      })
  );
};

// Create Comment
const createComment = async (req, res) => {
  // Validate all input fields
  const result = await commentSchema.validate(req.body);
  if (result.error) {
    res.status(400).send({ errorMessage: [result.error.details[0].message] });
    return;
  }

  // Check whether communityId is valid or not
  if (!ObjectId.isValid(req.body.community_id)) {
    res.status(400).send({ errorMessage: ["Select a valid community."] });
    return;
  }

  // Check whether postId is valid or not
  if (!ObjectId.isValid(req.body.post_id)) {
    res.status(400).send({ errorMessage: ["Select a valid post."] });
    return;
  }

  // Check whether parentId is valid or not
  if (req.body.parent_id && !ObjectId.isValid(req.body.parent_id)) {
    res.status(400).send({ errorMessage: ["Select a valid parent comment."] });
    return;
  }

  // TODO :- Change it to kafka_response_handler

  kafka.make_request(
    "reddit-post-topic",
    { path: "comment_create", body: req.body, user: req.user },
    (error, results) => {
      if (!results) {
        res.status(500).send({
          errorMessage: ["Failed to receive response from Kafka backend"],
        });
      }
      if (!results.res.success) {
        res.status(500).send({ ...results.res });
      } else {
        res.status(200).send({ ...results.res });
      }
    }
  );
};

// Upvote Post
const upvotePost = async (req, res) => {
  const result = await postVoteSchema.validate(req.body);
  if (result.error) {
    res.status(400).send({ errorMessage: [result.error.details[0].message] });
    return;
  }

  if (
    !ObjectId.isValid(req.body.community_id) ||
    !ObjectId.isValid(req.body.post_id)
  ) {
    res
      .status(400)
      .send({ errorMessage: ["Select a valid post and community."] });
  }

  // TODO :- Change it to kafka_response_handler
  kafka.make_request(
    "reddit-post-vote-topic",
    { path: "post_upvote", body: req.body, user: req.user },
    (error, results) => {
      if (!results) {
        res.status(500).send({
          errorMessage: ["Failed to receive response from Kafka backend"],
        });
      }
      if (!results.res.success) {
        res.status(500).send({ ...results.res });
      } else {
        res.status(200).send({ ...results.res });
      }
    }
  );
};

// Downvote Post
const downvotePost = async (req, res) => {
  const result = await postVoteSchema.validate(req.body);
  if (result.error) {
    res.status(400).send({ errorMessage: [result.error.details[0].message] });
    return;
  }
  if (
    !ObjectId.isValid(req.body.community_id) ||
    !ObjectId.isValid(req.body.post_id)
  ) {
    res
      .status(400)
      .send({ errorMessage: ["Select a valid post and community."] });
  }
  // TODO :- Change it to kafka_response_handler
  kafka.make_request(
    "reddit-post-vote-topic",
    { path: "post_downvote", body: req.body, user: req.user },
    (error, results) => {
      if (!results) {
        res.status(500).send({
          errorMessage: ["Failed to receive response from Kafka backend"],
        });
      }
      if (!results.res.success) {
        res.status(500).send({ ...results.res });
      } else {
        res.status(200).send({ ...results.res });
      }
    }
  );
};

// Upvote Comment
const upvoteComment = async (req, res) => {
  const result = await commentVoteSchema.validate(req.body);
  if (result.error) {
    res.status(400).send({ errorMessage: [result.error.details[0].message] });
    return;
  }
  if (
    !ObjectId.isValid(req.body.community_id) ||
    !ObjectId.isValid(req.body.post_id) ||
    !ObjectId.isValid(req.body.comment_id)
  ) {
    res
      .status(400)
      .send({ errorMessage: ["Select a valid community, post and comment."] });
  }
  // TODO :- Change it to kafka_response_handler
  kafka.make_request(
    "reddit-comment-vote-topic",
    { path: "comment_upvote", body: req.body, user: req.user },
    (error, results) => {
      if (!results) {
        res.status(500).send({
          errorMessage: ["Failed to receive response from Kafka backend"],
        });
      }
      if (!results.res.success) {
        res.status(500).send({ ...results.res });
      } else {
        res.status(200).send({ ...results.res });
      }
    }
  );
};

// Downvote Comment
const downvoteComment = async (req, res) => {
  const result = await commentVoteSchema.validate(req.body);
  if (result.error) {
    res.status(400).send({ errorMessage: [result.error.details[0].message] });
    return;
  }
  if (
    !ObjectId.isValid(req.body.community_id) ||
    !ObjectId.isValid(req.body.post_id) ||
    !ObjectId.isValid(req.body.comment_id)
  ) {
    res
      .status(400)
      .send({ errorMessage: ["Select a valid community, post and comment."] });
  }
  // TODO :- Change it to kafka_response_handler
  kafka.make_request(
    "reddit-comment-vote-topic",
    { path: "comment_downvote", body: req.body, user: req.user },
    (error, results) => {
      if (!results) {
        res.status(500).send({
          errorMessage: ["Failed to receive response from Kafka backend"],
        });
      }
      if (!results.res.success) {
        res.status(500).send({ ...results.res });
      } else {
        res.status(200).send({ ...results.res });
      }
    }
  );
};

// Create Post API
router.post(
  "/create",
  checkAuth,
  uploadPostImages.array("postImage"),
  createPost
);

// Create Comment API
router.post("/comment", checkAuth, createComment);

router.post("/upvote", checkAuth, upvotePost);

router.post("/downvote", checkAuth, downvotePost);

router.post("/comment/upvote", checkAuth, upvoteComment);

router.post("/comment/downvote", checkAuth, downvoteComment);

module.exports = router;
