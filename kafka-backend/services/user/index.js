import { registerUser } from '../../apis/user_api';

export const handle_request = async (message, callback) => {
  console.log("Handle Request for user ", message);
  switch (message.path) {
    case "user_signup":
      return registerUser(message, callback);
    default:
      return callback({ status: 500, data: "no path found" }, null);
  }
}