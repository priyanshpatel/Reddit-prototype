const redis = require("redis");
const client = redis.createClient({ detect_buffers: true });
const MessageModel = require('../models/MessageModel');

export const getAllMessages = async (message, callback) => {
  let response = {};
  let err = {};
  client.get('response', function (err, res) {
    if (res) {
      //console.log("Key found K");
      response.status = 200;
      response.data = JSON.parse(res);
      return callback(null,response);
      //response.status(200).send(JSON.parse(res)).end();
      //return;
    }
    MessageModel.find((error, result) => {
      if (error) {
        err.status = 200;
        err.data = error;
        return callback(err,null)
      } else if (result) {
        console.log("Key not found");
        client.set('response', JSON.stringify(result));
        response.status = 200;
        response.data = result;
        return callback(null,response);
        //response.status(200).send(result).end();
      } else {
        //response.status(500).send("Error").end();
      }
    });
  })
};