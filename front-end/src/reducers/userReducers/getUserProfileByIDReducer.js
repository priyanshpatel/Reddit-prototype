let initialState = {
    profileGetData: {},
    error: "",
    message: "",
};
let userProfileGetReducer = (state = initialState, action) => {
    console.log(action);
    let newState = { ...state };
    switch (action.type) {
        case "user_profile_success":
            newState.profileGetData = action.payload.response.data;
            newState.error = false;
            newState.message = "Join requests accepted successfully";
            return newState;
        case "user_profile_fail":
            newState.error = true;
            newState.message = "Join requests failed";
            return newState;
        default:
            return newState;
    }
};

export default userProfileGetReducer;
