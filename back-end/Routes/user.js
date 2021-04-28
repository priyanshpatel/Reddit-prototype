const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../utils/config").default;
const Users = require("../models/UsersModel");
const { auth } = require("../utils/passport");
var Joi = require("joi");
var { userschema } = require("../dataSchema/userschema");
const kafka = require("../kafka/client");
var { kafka_response_handler, kafka_default_response_handler } = require("../kafka/handler.js");
require("dotenv").config();

const router = express.Router();

const registerUser = async (req, res) => {
  console.log("Inside register user post Request");
  console.log("Request ", req.body);
  const { error, value } = Joi.object()
    .keys({ user: userschema.required() })
    .validate(req.body);

  if (error) {
    console.log(error)
    res.status(400).send(error.details);
    return;
  }
  kafka.make_request(
    "reddit-user-topic",
    { path: "user_signup", body: value },
    (err, results) =>
      kafka_response_handler(res, err, results, (result) => {
        const user = result.data;
        const payload = { _id: user._id, username: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 1008000,
        });
        return res.status(result.status).send({ user, token });
      })
  );
};

const loginUser = async (req, res) => {
  console.log("Inside login user post Request");
  console.log("Request ", req.body);
  kafka.make_request(
    "reddit-user-topic",
    { path: "user_login", body: req.body },
    (err, results) =>
      kafka_response_handler(res, err, results, (result) => {
        const user = result.data;
        const payload = { _id: user._id, username: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 1008000,
        });
        return res.status(result.status).send({ user, token });
      })
  );
};

const getAllCommunitiesForUser = async (req, res) => {
  console.log('Inside get All communities post Request');
  console.log('Request ', req.body);
  let userId = req.query.userId;
  console.log('user ID X', userId);
  if (!userId) {
    res
      .status(400)
      .send({
        code: 'INVALID_PARAM',
        msg: 'Invalid User ID',
      })
      .end();
  }
  kafka.make_request(
    'reddit-community-topic',
    { path: 'community-all-for-user', userId },
    (err, results) => kafka_default_response_handler(res, err, results));
}
const editUser = async (req, res) => {
  console.log("Inside edit user post Request");
  console.log("Request ", req.body);
  kafka.make_request(
    "reddit-user-topic",
    { path: "edit_user", body: req.body },
    (err, results) =>
      kafka_response_handler(res, err, results, (result) => {
        const user = result.data;
        return res.status(result.status).send({ user });
      })
  );
};

const getUser = async (req, res) => {
  console.log("Inside get user get Request");
  console.log("Request ", req.query);
  kafka.make_request(
    "reddit-user-topic",
    { path: "get_user", body: req.query },
    (err, results) =>
      kafka_response_handler(res, err, results, (result) => {
        const user = result.data;
        return res.status(result.status).send({ user });
      })
  );
};

router.post("/signup", registerUser);
router.post("/login", login);
router.get("/communities", getAllCommunitiesForUser);
router.post("/login", loginUser);
router.put("/edit", editUser);
router.get("/get", getUser);

module.exports = router;
