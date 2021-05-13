let initialState = {
    chatData: {},
    error: false,
    message : ""
}
var chatReducer = (state = initialState, action) => {
    console.log(action.payload)
    let newState = { ...state }
    switch (action.type) {
        case "chat_submit_success":
            newState.chatData = action.payload.response.data;
            newState.error = false;
            return newState;
        case "chat_submit_fail":
            newState.error = true;
            newState.message = "Sorry there was an error in updating the community."
            return newState;
        default:
            return newState;
    }
}

export default chatReducer