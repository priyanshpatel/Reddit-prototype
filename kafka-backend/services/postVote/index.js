const { upvotePost, downvotePost } = require("../../apis/post_vote_api");

export const handle_request = async (message, callback) => {
  switch (message.path) {
    case "post_upvote":
      return upvotePost(message, callback);
    case "post_downvote":
      return downvotePost(message, callback);
  }
};
