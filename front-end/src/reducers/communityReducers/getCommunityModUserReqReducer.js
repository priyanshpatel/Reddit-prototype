// Created by Priyansh Patel
let initialState = {
  userData: [],
  error: false,
  message: "",
};
let getMyCommunityModUserReqReducer = (state = initialState, action) => {
  console.log(action.payload);
  let newState = { ...state };
  switch (action.type) {
    case "get_my_community_mod_user_req_success":
      newState.userData = action.payload.response.data;
      newState.error = false;
      return newState;
    case "get_my_community_mod_user_req_failed":
      newState.error = true;
      newState.message = "Error while getting user requests";
      return newState;
    default:
      return newState;
  }
};

export default getMyCommunityModUserReqReducer;
