import {
  createCommunity,
  updateExistingCommunity,
  getAllCommunityForUser,
  getCommunityDetails,
  getAllPosts,
  getAllCreatedCommunities,
  requestToJoinCommunity,
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
    case "get-created-communities":
      return getAllCreatedCommunities(message, callback);
    case "join-community":
      return requestToJoinCommunity(message, callback);
    default:
      return callback({ status: 500, data: "no path found" }, null);
  }
};
