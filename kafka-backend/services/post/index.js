const { createPost, createComment } = require("../../apis/post_api");

export const handle_request = async (message, callback) => {
  switch (message.path) {
    case "post_create":
      return createPost(message, callback);
    case "comment_create":
      return createComment(message, callback);
  }
};
