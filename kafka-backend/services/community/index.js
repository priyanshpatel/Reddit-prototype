<<<<<<< HEAD
import { createCommunity, updateExistingCommunity, getAllCommunityForUser, getCommunityDetails, getCommunityListCreatedByUser } from "../../apis/community_api";
=======
import {
  createCommunity,
  updateExistingCommunity,
  getAllCommunityForUser,
  getCommunityDetails,
  getAllPosts,
} from "../../apis/community_api";
>>>>>>> e63afe0b3b4545b90bc39a2377b43ee74d514c5d

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
<<<<<<< HEAD
    case "communityList-createdByUser":
      return getCommunityListCreatedByUser(message, callback);
=======
    case "get-posts":
      return getAllPosts(message, callback);
>>>>>>> e63afe0b3b4545b90bc39a2377b43ee74d514c5d
    default:
      return callback({ status: 500, data: "no path found" }, null);
  }
};
