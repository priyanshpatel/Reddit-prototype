const mongoose = require("mongoose");
const { Schema } = mongoose;

const postsVotesSchema = new Schema(
  {
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    vote: {
      type: Number,
      min: -1,
      max: 1,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

const PostsVotes = mongoose.model("postsVotes", postsVotesSchema, "postsVotes");

module.exports = PostsVotes;
