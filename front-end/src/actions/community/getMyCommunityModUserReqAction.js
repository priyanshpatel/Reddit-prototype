// Created by Priyansh Patel
import axios from "axios";
import { BACKEND_URL, BACKEND_PORT } from "../../config/config";
import cookie from "react-cookies";

const GET_MY_COMMUNITY_MOD_USER_REQ_SUCESS =
  "get_my_community_mod_user_req_success";
const GET_MY_COMMUNITY_MOD_USER_REQ_FAILED =
  "get_my_community_mod_user_req_failed";

let successGetMyCommunityModUserReq = (response, data) => {
  return {
    type: GET_MY_COMMUNITY_MOD_USER_REQ_SUCESS,
    payload: {
      response: response,
      data: data,
    },
  };
};

let errorGetMyCommunityModUserReq = (err, data) => {
  return {
    type: GET_MY_COMMUNITY_MOD_USER_REQ_FAILED,
    payload: {
      response: err,
      data: data,
    },
  };
};

let getMyCommunityModUserReq = (data) => (dispatch) => {
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
        data.userReqPageNumber +
        "&userType=REQUESTED" +
        "&pageSize=" +
        data.userReqPageSize +
        (data.userReqSearchKeyword !== ""
          ? data.userReqSearchKeyword.length !== 0
            ? "&searchKeyword=" + data.userReqSearchKeyword
            : ""
          : "")
    )
    .then((response) => {
      if (response.status === 200) {
        console.log("api response>>>>>>>>>>", response);
        dispatch(successGetMyCommunityModUserReq(response, data));
      }
    })
    .catch((err) => {
      dispatch(errorGetMyCommunityModUserReq(err, data));
    });
};

export default getMyCommunityModUserReq;
