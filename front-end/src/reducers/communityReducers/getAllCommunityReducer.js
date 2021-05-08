let initialState = {
    getAllCommunityData: [],
    error: false,
    message : ""
}
let myCommunitiesReducer = (state = initialState, action) => {
    console.log(action.payload)
    let newState = { ...state }
    switch (action.type) {
        case "get_all_communities_success":
            newState.getAllCommunityData = action.payload.response.data;
            newState.error = false;
            return newState;
        case "get_all_communities_fail":
            newState.error = true;
            newState.message = action.payload.response.data
            return newState;
        default:
            return newState;
    }
}

export default myCommunitiesReducer;