const express = require("express");
const kafka = require("../kafka/client");
const { kafka_response_handler } = require("../kafka/handler.js");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const addMessages = async (req, res) => {
    // Kafka make request call
    if (!ObjectId.isValid(req.body.members[0]) || !ObjectId.isValid(req.body.members[1])) {
        res.status(400).send({ errorMessage: ["Select a valid user Id"] });
        return;
    }
    if (!ObjectId.isValid(req.body.message.from)) {
        res.status(400).send({ errorMessage: ["Select a valid sender user Id"] });
        return;
    }
    kafka.make_request(
        "reddit-chat-topic",
        { path: "add_message", body: req.body },
        (err, results) =>
            kafka_response_handler(res, err, results, (result) => {
                return res.status(200).send(result);
            })
    );
};

const getMessages = async (req, res) => {
    // Kafka make request call
    kafka.make_request(
        "reddit-chat-topic",
        { path: "get_messages", body: req.query },
        (err, results) =>
            kafka_response_handler(res, err, results, (result) => {
                return res.status(200).send(result);
            })
    );
};

const getChatMemberList = async (req, res) => {
    // Kafka make request call
    kafka.make_request(
        "reddit-chat-topic",
        { path: "get_chat_member_list", body: req.query },
        (err, results) =>
            kafka_response_handler(res, err, results, (result) => {
                return res.status(200).send(result);
            })
    );
};

router.post("/send", addMessages);
router.get("/get", getMessages);
router.get("/getchatmemberlist", getChatMemberList);

module.exports = router;