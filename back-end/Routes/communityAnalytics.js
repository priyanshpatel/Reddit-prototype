const express = require("express");
const kafka = require("../kafka/client");
const { kafka_response_handler } = require("../kafka/handler.js");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const getCommunityAnalytics = async (req, res) => {
    // Kafka make request call
    kafka.make_request(
        "reddit-community-analytics-topic",
        { path: "community_analytics", body: req.query },
        (err, results) =>
            kafka_response_handler(res, err, results, (result) => {
                return res.status(200).send(result);
            })
    );
};

router.get("/get", getCommunityAnalytics);

module.exports = router;