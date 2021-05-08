let initialState = {
    downVoteCommunityData: [],
    error: false,
    message: ""
}
let downVoteCommunityReducer = (state = initialState, action) => {
    console.log(action.payload)
    let newState = { ...state }
    switch (action.type) {
        case "downvote_community_get_success":
            newState.downVoteCommunityData = action.payload.response.data;
            newState.error = false;
            return newState;
        case "downvote_community_get_fail":
            newState.error = true;
            newState.message = "Error while getting communities"
            return newState;
        default:
            return newState;
    }
}

export default downVoteCommunityReducer;