let initialState = {
    data: {},
    error: "",
    message: ""
}
let createPost = (state = initialState, action) => {
    console.log(action);
    let newState = { ...state }
    switch (action.type) {
        case "create_post_success":
            newState.id = action.payload.response.data;
            newState.error = false;
            newState.message = "Post created successfully";
            return newState;
        case "create_post_failed":
            newState.error = true;
            newState.message = "Error while creating post"
            return newState;
        default:
            return newState;
    }
}

export default createPost