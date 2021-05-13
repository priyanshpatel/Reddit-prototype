const express = require("express");
const router = express.Router();
const MessageModel = require('../models/MessageModel');
const redis = require("redis");
const client = redis.createClient({ detect_buffers: true });
const kafka = require("../kafka/client");
var {
  kafka_response_handler,
  kafka_default_response_handler,
} = require("../kafka/handler.js");
require("dotenv").config();

//With redis 
const getAllMessages = async (req, response) => {
  const redis = require("redis");
  const client = redis.createClient({ detect_buffers: true });
  client.get('response', function (err, res) {
    if (res) {
      console.log("Key found");
      response.status(200).send(JSON.parse(res)).end();
      return;
    }
    MessageModel.find((error, result) => {
      if (error) {
        res.status(500).send("Error").end();
      } else if (result) {
        console.log("Key not found");
        client.set('response', JSON.stringify(result));
        response.status(200).send(result).end();
      } else {
        response.status(500).send("Error").end();
      }
    });
  })
};
//Without redis
const getAllMessagesWithoutRedis = async (req, response) => {
  const result = await MessageModel.find();
  response.status(200).send(result).end();
};



  // let userId = req.query.userId;
  // console.log("user ID X", userId);
  // if (!userId) {
  //   res
  //     .status(400)
  //     .send({
  //       code: "INVALID_PARAM",
  //       msg: "Invalid User ID",
  //     })
  //     .end();
  // }




  // kafka.make_request(
  //   "reddit-community-topic",
  //   { path: "community-all-for-user", userId },
  //   (err, results) => kafka_default_response_handler(res, err, results)
  // );

const addMessage = async (req, res) => {
  console.log("Inside add message post Request");
  let message = req.body.message;
  let messageArray = [];

  for (var i = 0; i < 10000; i++) {
    messageArray.push(message);
  }
  await insertManyMessage(messageArray);
  //message = await insertMessage(message);

  res.status(200).send("Success").end();;
  // let userId = req.query.userId;
  // console.log("user ID X", userId);
  // if (!userId) {
  //   res
  //     .status(400)
  //     .send({
  //       code: "INVALID_PARAM",
  //       msg: "Invalid User ID",
  //     })
  //     .end();
  // }




  // kafka.make_request(
  //   "reddit-community-topic",
  //   { path: "community-all-for-user", userId },
  //   (err, results) => kafka_default_response_handler(res, err, results)
  // );
};

async function insertMessage(message) {
  console.log('Inside insert User');

  var message = new MessageModel(message);
  return await message.save();
}

async function insertManyMessage(messages) {
  console.log('Inside insert many messages');

  MessageModel.insertMany(messages).then(function () {
    console.log("Data inserted")  // Success
  }).catch(function (error) {
    console.log(error)      // Failure
  });
}
const getAllMessagesWithkafka = async (req, res) => {
  //console.log("Inside get user get Request");
  //console.log("Request ", req.query);
  kafka.make_request(
    "reddit-testing-topic",
    { path: "get_messages", body: req.query },
    (err, results) => kafka_default_response_handler(res, err, results)
  );
};


router.get("/getMessages", getAllMessages);
router.get("/getMessagesWithoutRedis",getAllMessagesWithoutRedis);
router.get("/getMessagesWithkafka",getAllMessagesWithkafka);
router.post("/addMessages", addMessage);
module.exports = router;