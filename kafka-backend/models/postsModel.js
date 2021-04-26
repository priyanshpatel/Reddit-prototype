// Created by Priyansh Patel on 04/24

const mongoose = require("mongoose");

const { Schema } = mongoose;

// Comments Schema
const commentSchema = new Schema(
  {
    parent_id: {
      type: mongoose.ObjectId,
    },
    depth: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Posts Schema
const postSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["text", "image", "link"],
      trim: true,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    numberOfComments: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
    },
    comments: [commentSchema],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    // UNCOMMENT THE BELOW CODE WHEN COMMUNITY MODEL IS CREATED

    // community: {
    //   type: Schema.Types.ObjectId,
    //   ref: "community",
    //   required: true,
    // }

    // COMMENT THIS CODE WHEN COMMUNITY MODEL IS CREATED AND UNCOMMENT THE CODE ABOVE
    community: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Post = mongoose.model("Post", postSchema, "posts");
module.exports = Post;
