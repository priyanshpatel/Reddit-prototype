const mongoose = require("mongoose");
const { Schema } = mongoose;
const config = require("../config/config");

const notificationSchema = new Schema(
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
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Notification = mongoose.model(
  "notification",
  notificationSchema,
  "notifications"
);
module.exports = Notification;
