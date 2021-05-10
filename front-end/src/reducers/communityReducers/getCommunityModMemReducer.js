// Created by Priyansh Patel
let initialState = {
  memberData: {},
  error: "",
  message: "",
};
let getCommunityModMemreducer = (state = initialState, action) => {
  console.log(action);
  let newState = { ...state };
  switch (action.type) {
    case "get_my_community_mod_mem_success":
      newState.memberData = action.payload.response.data;
      newState.error = false;
      return newState;
    case "get_my_community_mod_mem_failed":
      newState.error = true;
      newState.message = "Error getting community members";
      return newState;
    default:
      return newState;
  }
};

export default getCommunityModMemreducer;
