const {
  upvoteComment,
  downvoteComment,
} = require("../../apis/comment_vote_api");

export const handle_request = async (message, callback) => {
  switch (message.path) {
    case "comment_upvote":
      return upvoteComment(message, callback);
    case "comment_downvote":
      return downvoteComment(message, callback);
  }
};
