const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");
const config = require("../config/config");

const invitationSchema = new Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    community: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "community",
      required: true,
    },
    status: {
      type: String,
      enum: [
        config.USER_ACCEPTED_INVITE,
        config.USER_PENDING_INVITE,
        config.USER_REJECTED_INVITE,
      ],
      trim: true,
      required: true,
      default: "PENDING_INVITE",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
invitationSchema.plugin(mongoosePaginate);
const Invitation = mongoose.model(
  "invitation",
  invitationSchema,
  "invitations"
);
module.exports = Invitation;
