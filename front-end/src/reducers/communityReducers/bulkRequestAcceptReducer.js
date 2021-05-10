// Created by Priyansh Patel
let initialState = {
  requestAcceptData: {},
  error: "",
  message: "",
};
let bulkRequestAcceptReducer = (state = initialState, action) => {
  console.log(action);
  let newState = { ...state };
  switch (action.type) {
    case "bulk_accept_request_success":
      newState.requestAcceptData = action.payload.response.data;
      newState.error = false;
      newState.message = "Join requests accepted successfully";
      return newState;
    case "bulk_accept_request_failed":
      newState.error = true;
      newState.message = "Join requests failed";
      return newState;
    default:
      return newState;
  }
};

export default bulkRequestAcceptReducer;
