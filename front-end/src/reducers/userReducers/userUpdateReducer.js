let initialState = {
    auth: false,
    message: "",
    error: ""
}
var userSignUp = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case "user_profile_update_success":
            newState.auth = true;
            newState.signUpError = false;
            newState.message = "User Updated Successfully"
            return newState;
        case "user_profile_update_failed":
            newState.auth = false;
            newState.error = true;
            newState.message = "User Update fail"
            return newState;
        default:
            return newState;
    }
}

export default userSignUp