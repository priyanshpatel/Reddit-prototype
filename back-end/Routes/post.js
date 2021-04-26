const express = require("express");
const { checkAuth } = require("../Utils/passport");
const postSchema = require("../dataSchema/postSchema");
const commentSchema = require("../dataSchema/commentSchema");
const kafka = require("../kafka/client");
const ObjectId = require("mongoose").Types.ObjectId;
const multer = require("multer");
const path = require("path");

// Initializing router
const router = express.Router();

// Using multer to store images

// CHANGE USER_ID IN FILE NAME TO COMMUNITY_ID ONCE COMMUNITY CODE IS MIGRATED
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

const createPost = async (req, res) => {
  // Validate the input fields
  const result = await postSchema.validate(req.body);
  if (result.error) {
    res.status(400).send({ errorMessage: result.error.details[0].message });
    return;
  }

  // Check whether communityId is valid or not
  if (!ObjectId.isValid(req.body.community_id)) {
    res.status(400).send({ errorMessage: "Select a valid community." });
    return;
  }

  // Checks for different type
  if (req.body.type === "text") {
    if (!req.body.description || req.body.description.trim().length === 0) {
      res.status(400).send({ errorMessage: "Enter a valid description." });
      return;
    }
  } else if (req.body.type === "image") {
    if (!req.files || req.files.length === 0) {
      res.status(400).send({ errorMessage: "Please upload an image." });
      return;
    }
  } else if (req.body.type === "link") {
    if (!req.body.link || req.body.link.trim().length === 0) {
      res.status(400).send({ errorMessage: "Enter a valid url." });
      return;
    }
  }
  // Kafka make request call
  kafka.make_request(
    "reddit-post-topic",
    { path: "post_create", body: req.body, files: req.files, user: req.user },
    (error, results) => {
      if (!results) {
        res.status(500).send({
          errorMessage: "Failed to receive response from Kafka backend",
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

const createComment = async (req, res) => {
  // Validate all input fields
  const result = await commentSchema.validate(req.body);
  if (result.error) {
    res.status(400).send({ errorMessage: result.error.details[0].message });
    return;
  }

  // Check whether communityId is valid or not
  if (!ObjectId.isValid(req.body.community_id)) {
    res.status(400).send({ errorMessage: "Select a valid community." });
    return;
  }

  // Check whether postId is valid or not
  if (!ObjectId.isValid(req.body.post_id)) {
    res.status(400).send({ errorMessage: "Select a valid post." });
    return;
  }

  // Check whether parentId is valid or not
  if (req.body.parent_id && !ObjectId.isValid(req.body.parent_id)) {
    res.status(400).send({ errorMessage: "Select a valid parent comment." });
    return;
  }

  kafka.make_request(
    "reddit-post-topic",
    { path: "comment_create", body: req.body, user: req.user },
    (error, results) => {
      if (!results) {
        res.status(500).send({
          errorMessage: "Failed to receive response from Kafka backend",
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

module.exports = router;
