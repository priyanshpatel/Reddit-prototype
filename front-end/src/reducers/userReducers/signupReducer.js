let initialState = {
    auth: false,
    signUpmessage: "",
    signUpError: ""
}
var userSignUp = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case "signup_success":
            newState.auth = true;
            newState.signUpError = false;
            newState.signUpmessage = "User SignUp Success"
            return newState;
        case "signup_failed":
            newState.auth = false;
            newState.signUpError = true;
            newState.signUpmessage = action.payload.response.response.data.msg
            return newState;
        default:
            return newState;
    }
}

export default userSignUp