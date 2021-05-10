// Created by Priyansh Patel
import axios from "axios";
import { BACKEND_URL, BACKEND_PORT } from "../../config/config";
import cookie from "react-cookies";

const GET_MY_COMMUNITY_MOD_MEM_SUCESS = "get_my_community_mod_mem_success";
const GET_MY_COMMUNITY_MOD_MEM_FAILED = "get_my_community_mod_mem_failed";

let successGetMyCommunityModMem = (response, data) => {
  return {
    type: GET_MY_COMMUNITY_MOD_MEM_SUCESS,
    payload: {
      response: response,
      data: data,
    },
  };
};

let errorGetMyCommunityModMem = (err, data) => {
  return {
    type: GET_MY_COMMUNITY_MOD_MEM_FAILED,
    payload: {
      response: err,
      data: data,
    },
  };
};

let getMyCommunityModMemAction = (data) => (dispatch) => {
  console.log("inside GET MEMBERS action", data);

  axios.defaults.headers.common["authorization"] = cookie.load("token");
  axios.defaults.withCredentials = true;
  return axios
    .get(
      BACKEND_URL +
        ":" +
        BACKEND_PORT +
        "/community/mycommunities/users/" +
        data.communityId +
        "?pageNumber=" +
        data.memberPageNumber +
        "&userType=JOINED" +
        "&pageSize=" +
        data.memberPageSize +
        (data.memberSearchKeyword !== ""
          ? data.memberSearchKeyword.length !== 0
            ? "&searchKeyword=" + data.memberSearchKeyword
            : ""
          : "")
    )
    .then((response) => {
      if (response.status === 200) {
        console.log("MEMBER API response>>>>>>>>>>", response);
        dispatch(successGetMyCommunityModMem(response, data));
      }
    })
    .catch((err) => {
      dispatch(errorGetMyCommunityModMem(err, data));
    });
};

export default getMyCommunityModMemAction;
