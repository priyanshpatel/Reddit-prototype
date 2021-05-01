let initialState = {
    auth: false,
    signUpmessage : "",
    signUpError : ""
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
            newState.error = true;
            newState.signUpmessage = "User already Exist!"
            return newState;
        default:
            return newState;
    }
}

export default userSignUp