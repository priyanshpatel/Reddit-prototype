import {
  createCommunity,
  updateExistingCommunity,
  getAllCommunityForUser,
  getCommunityDetails,
  getAllPosts,
} from "../../apis/community_api";

export const handle_request = async (message, callback) => {
  console.log("Handle Request for Community ", message);
  switch (message.path) {
    case "community-create":
      return createCommunity(message, callback);
    case "community-update":
      return updateExistingCommunity(message, callback);
    case "community-all-for-user":
      return getAllCommunityForUser(message, callback);
    case "community-details":
      return getCommunityDetails(message, callback);
    case "get-posts":
      return getAllPosts(message, callback);
    default:
      return callback({ status: 500, data: "no path found" }, null);
  }
};
