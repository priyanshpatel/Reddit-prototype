const path = require("path");
import { S3 } from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

export const uploadS3 = multer({
  fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: "reddit-images-s3/images",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "RedditImages" });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});
