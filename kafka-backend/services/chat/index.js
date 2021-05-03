const { addMessage, getMessages } = require("../../apis/chat_api");

export const handle_request = async (message, callback) => {
  switch (message.path) {
    case "add_message":
      return addMessage(message, callback);
    case "get_messages":
      return getMessages(message, callback);
  }
};
