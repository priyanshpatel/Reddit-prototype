const {
  bulkInviteUsersToCommunity,
  getInviteStatus,
  getInvitations,
  updateInviteStatus,
} = require("../../apis/invitation_api");
export const handle_request = async (message, callback) => {
  switch (message.path) {
    case "bulk-invite":
      return bulkInviteUsersToCommunity(message, callback);
    case "get-invite-status":
      return getInviteStatus(message, callback);
    case "get-notifications":
      return getInvitations(message, callback);
    case "update-invite-status":
      return updateInviteStatus(message, callback);
  }
};
