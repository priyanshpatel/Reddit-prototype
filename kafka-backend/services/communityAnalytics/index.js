const { communityAnalytics } = require("../../apis/community_analytics_api");

export const handle_request = async (message, callback) => {
  switch (message.path) {
    case "community_analytics":
      return communityAnalytics(message, callback);
  }
};
