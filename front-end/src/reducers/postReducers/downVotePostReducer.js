

let initialState = {
    getDownvoteDataPost: "",
    error: "",
    message: ""
}
let downVotePost = (state = initialState, action) => {
    console.log(action);
    let newState = { ...state }
    switch (action.type) {
        case "downvote_get_success":
            newState.getDownvoteDataPost = action.payload.response.data;
            newState.error = false;
            newState.message = "Post DownVoted successfully";
            return newState;
        case "downvote_get_fail":
            newState.error = true;
            newState.message = "Error in Upvoting"
            return newState;
        default:
            return newState;
    }
}

export default downVotePost