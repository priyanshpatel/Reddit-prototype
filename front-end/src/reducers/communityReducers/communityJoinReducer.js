// Created by Het Brahmbhatt
let initialState = {
    joinRequestAcceptData: {},
    error: "",
    message: "",
};
let bulkRequestAcceptReducer = (state = initialState, action) => {
    console.log(action);
    let newState = { ...state };
    switch (action.type) {
        case "community_join_request_success":
            newState.joinRequestAcceptData = action.payload.response.data;
            newState.error = false;
            newState.message = "Join requests accepted successfully";
            return newState;
        case "community_join_request_fail":
            newState.error = true;
            newState.message = action.payload.response.response.data.errorMessage[0];
            return newState;
        default:
            return newState;
    }
};

export default bulkRequestAcceptReducer;
