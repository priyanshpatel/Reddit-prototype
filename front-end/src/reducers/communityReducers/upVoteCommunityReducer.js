let initialState = {
    upVotecommunityData: [],
    error: false,
    message: ""
}
let upVoteCommunityReducer = (state = initialState, action) => {
    console.log(action.payload)
    let newState = { ...state }
    switch (action.type) {
        case "upvote_community_get_success":
            newState.upVotecommunityData = action.payload.response.data;
            newState.error = false;
            return newState;
        case "upvote_community_get_fail":
            newState.error = true;
            newState.message = "Error while getting communities"
            return newState;
        default:
            return newState;
    }
}

export default upVoteCommunityReducer;