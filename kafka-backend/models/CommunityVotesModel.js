const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const communityVoteSchema = new Schema({
  communityId: {
    type: Schema.Types.ObjectId,
    ref: "community",
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
module.exports = mongoose.model("communityVote", communityVoteSchema);
