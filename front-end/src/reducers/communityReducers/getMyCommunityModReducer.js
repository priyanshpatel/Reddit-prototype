let initialState = {
  communityData: [],
  error: false,
  message: "",
};
let getMyCommunityModReducer = (state = initialState, action) => {
  console.log(action.payload);
  let newState = { ...state };
  switch (action.type) {
    case "get_my_community_mod_success":
      newState.communityData = action.payload.response.data;
      newState.error = false;
      return newState;
    case "get_my_community_mod_failed":
      newState.error = true;
      newState.message = "Error while getting communities";
      return newState;
    default:
      return newState;
  }
};

export default getMyCommunityModReducer;
