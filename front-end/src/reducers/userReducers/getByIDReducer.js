let initialState = {
    getByIDuserData: {},
    error: false,
}
var getByIDReducer = (state = initialState, action) => {
    console.log(action.payload)
    let newState = { ...state }
    switch (action.type) {
        case "user_get_success":
            newState.getByIDuserData = action.payload.response;
            newState.error = false;
            return newState;
        case "user_get_fail":
            newState.error = true;
            newState.message = "No user found"
            return newState;
        default:
            return newState;
    }
}

export default getByIDReducer