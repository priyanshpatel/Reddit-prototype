

let initialState = {
    getUpvoteCommentData: "",
    error: "",
    message: ""
}
let upVoteComment = (state = initialState, action) => {
    console.log(action);
    let newState = { ...state }
    switch (action.type) {
        case "upvote_comment_get_success":
            newState.getUpvoteCommentData = action.payload.response.data;
            newState.error = false;
            newState.message = "Comment DownVoted successfully";
            return newState;
        case "upvote_comment_get_fail":
            newState.error = true;
            newState.message = "Error in Upvoting Comment"
            return newState;
        default:
            return newState;
    }
}

export default upVoteComment