let initialState = {
    dashboardData: {},
    loginError: "",
    loginMessage: ""
}
var login = (state = initialState, action) => {
    console.log(action);
    let newState = { ...state }
    switch (action.type) {
        case "get_dashboard_data_success":
            newState.dashboardData = action.payload.response.data;
            newState.error = false;
            newState.message = "Dashboard Data";
            return newState;
        case "get_dashboard_data_fail":
            newState.loginError = true;
            // newState.loginMessage = action.payload.response.response.data.msg
            return newState;
        default:
            return newState;
    }
}

export default login