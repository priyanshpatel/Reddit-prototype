const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsVotesSchema = new Schema(
  {
    post_id: {
      type: Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
    comment_id: {
      type: Schema.Types.ObjectId,
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

const CommentsVotes = mongoose.model(
  "commentsVotesSchema",
  commentsVotesSchema,
  "commentsVotesSchema"
);

module.exports = CommentsVotes;
