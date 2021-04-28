const express = require("express");
const { auth } = require("../Utils/passport");
var Joi = require("joi");
const kafka = require("../kafka/client");
var { kafka_default_response_handler, kafka_response_handler } = require("../kafka/handler.js");
const { communitySchema, updateCommunitySchema } = require("../dataSchema/communitySchema");
require("dotenv").config();

const router = express.Router();

const createCommunity = async (req, res) => {
  console.log("Inside create community post Request");
  console.log("Request ", req.body.community);
  const { error, value } = Joi.object()
    .keys({ community: communitySchema.required() })
    .validate(req.body);

  if (error) {
    res.status(400).send(error.details);
    return;
  }
  kafka.make_request(
    "reddit-community-topic",
    { path: "community-create", body: req.body },
    (err, results) => kafka_default_response_handler(res, err, results)
  );
};

const updateCommunity = async (req, res) => {
  console.log("Inside update community post Request");
  console.log("Request ", req.body.community);
  const { error, value } = Joi.object()
    .keys({ community: updateCommunitySchema.required() })
    .validate(req.body);

  if (error) {
    res.status(400).send(error.details);
    return;
  }
  kafka.make_request(
    "reddit-community-topic",
    { path: "community-update", body: value },
    (err, results) => kafka_default_response_handler(res, err, results)
  );
};

export const getAllCommunitiesForUser = async (req, res) => {
  console.log("Inside get All communities post Request");
  console.log("Request ", req.body);
  let userId = req.query.userId;
  console.log('user ID X', userId);
  if (!userId) {
    res
      .status(400)
      .send(
        {
          code: 'INVALID_PARAM',
          msg: 'Invalid User ID'
        }
      )
      .end();
  }
  kafka.make_request(
    "reddit-community-topic",
    { path: "community-all-for-user", userId },
    (err, results) => kafka_default_response_handler(res, err, results)
  );
};

router.post("/create", createCommunity);
router.post("/update", updateCommunity);
router.get("/getAllCommunity", getAllCommunitiesForUser);

module.exports = router;