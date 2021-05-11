const { getAllMessages } = require("../../apis/testing_api");

export const handle_request = async (message, callback) => {
  switch (message.path) {
    case "get_messages":
      return getAllMessages(message, callback);
  }
};