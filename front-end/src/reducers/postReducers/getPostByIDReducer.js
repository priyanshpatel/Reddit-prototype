let initialState = {
    postData: {},
    error: "",
    message: ""
}
let getPost = (state = initialState, action) => {
    console.log(action);
    let newState = { ...state }
    switch (action.type) {
        case "post_get_success":
            newState.postData = action.payload.response.data;
            newState.error = false;
            newState.message = "Post Got successfully";
            return newState;
        case "post_get_fail":
            newState.error = true;
            newState.message = action.payload.response.response.data.errorMessage
            return newState;
        default:
            return newState;
    }
}

export default getPost