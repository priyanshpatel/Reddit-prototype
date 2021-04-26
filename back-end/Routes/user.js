const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../Utils/config").default;
const Users = require("../models/UsersModel");
const { auth } = require("../Utils/passport");
var Joi = require("joi");
var { userschema } = require("../dataSchema/userschema");
const kafka = require("../kafka/client");
var { kafka_response_handler } = require("../kafka/handler.js");
require("dotenv").config();

const router = express.Router();

const registerUser = async (req, res) => {
  console.log("Inside register user post Request");
  console.log("Request ", req.body);
  const { error, value } = Joi.object()
    .keys({ user: userschema.required() })
    .validate(req.body);

  if (error) {
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

const login = async (req, res) => {
  const doc = await Users.findOne({ email: req.body.email });
  if (doc !== null) {
    bcrypt.compare(req.body.password, doc.password, (err, isMatch) => {
      if (isMatch === true) {
        req.session.user = doc;
        const { _id, name } = doc;
        const payload = { _id, name };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 1008000,
        });
        res.status(200).send(`JWT ${token}`);
      } else {
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
};

router.post("/signup", registerUser);
router.post("/login", login);

module.exports = router;
