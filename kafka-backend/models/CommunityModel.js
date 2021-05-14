const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../config/config");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Post = require("./PostsModel");

const communitySchema = new Schema(
  {
    communityName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    communityAvatar: [{ type: String, required: true }],
    communityCover: { type: String, required: true },
    rules: { type: Array },
    creator: { type: Schema.Types.ObjectId, ref: "user" },
    members: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "user" },
        communityJoinStatus: {
          type: String,
          enum: [
            config.REQUESTED_TO_JOIN_COMMUNITY,
            config.INVITED_TO_JOIN_COMMUNITY,
            config.REJECTED_REQUEST_TO_JOIN_COMMUNITY,
            config.ACCEPTED_REQUEST_TO_JOIN_COMMUNITY,
          ],
        },
      },
    ],
    posts: [{ type: Schema.Types.ObjectId, ref: "post" }],

  },
  {
    timestamps: true,
    versionKey: false,
  }
);
communitySchema.plugin(aggregatePaginate);
communitySchema.pre('remove', function (next) {
  Post.remove({ community: this._id }).exec();
  next();
});

module.exports = mongoose.model("community", communitySchema);
