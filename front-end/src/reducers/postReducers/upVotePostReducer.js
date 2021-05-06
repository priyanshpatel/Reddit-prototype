

let initialState = {
    getDataPost: "",
    error: "",
    message: ""
}
let upVotePost = (state = initialState, action) => {
    console.log(action);
    let newState = { ...state }
    switch (action.type) {
        case "upvote_get_success":
            newState.getDataPost = action.payload.response.data;
            newState.error = false;
            newState.message = "Post Upvoted successfully";
            return newState;
        case "upvote_get_fail":
            newState.error = true;
            newState.message = "Error in Upvoting"
            return newState;
        default:
            return newState;
    }
}

export default upVotePost