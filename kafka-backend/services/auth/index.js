var  { getUserByObjId } = "../../apis/user_apis";
 const handle_request = async (message, callback) => {
  if (message.path === "user-auth") {
    return getUserByObjId(message.body, callback);
  }
  else {
    return callback({ status: 500, data: "no path found" }, null);
  }
}