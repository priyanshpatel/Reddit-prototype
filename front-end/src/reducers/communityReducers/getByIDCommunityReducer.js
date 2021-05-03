let initialState = {
    getCommunityData: [],
    error: false,
    message: ""
}
let getByIDCommunityReducer = (state = initialState, action) => {
    console.log(action.payload)
    let newState = { ...state }
    switch (action.type) {
        case "community_get_success":
            newState.getCommunityData = action.payload.response;
            newState.error = false;
            return newState;
        case "community_get_fail":
            newState.error = true;
            newState.message = "Error while getting communities"
            return newState;
        default:
            return newState;
    }
}

export default getByIDCommunityReducer;