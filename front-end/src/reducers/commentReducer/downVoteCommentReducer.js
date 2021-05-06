

let initialState = {
    getDownVoteCommentData: "",
    error: "",
    message: ""
}
let downVoteComment = (state = initialState, action) => {
    console.log(action);
    let newState = { ...state }
    switch (action.type) {
        case "downvote_comment_get_success":
            newState.getDownVoteCommentData = action.payload.response.data;
            newState.error = false;
            newState.message = "Comment DownVoted successfully";
            return newState;
        case "downvote_comment_get_fail":
            newState.error = true;
            newState.message = "Error in Upvoting Comment"
            return newState;
        default:
            return newState;
    }
}

export default downVoteComment