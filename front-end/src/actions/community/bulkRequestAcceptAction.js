// Created by Priyansh Patel
import axios from "axios";
import { BACKEND_URL, BACKEND_PORT } from "../../config/config";
import cookie from "react-cookies";

const BULK_ACCEPT_REQUEST_SUCCESS =
  "bulk_accept_request_success";
const BULK_ACCEPT_REQUEST_FAILED =
  "bulk_accept_request_failed";

let successBulkAcceptRequest = (response, data) => {
  return {
    type: BULK_ACCEPT_REQUEST_SUCCESS,
    payload: {
      response: response,
      data: data,
    },
  };
};

let errorBulkAcceptRequest = (err, data) => {
  return {
    type: BULK_ACCEPT_REQUEST_FAILED,
    payload: {
      response: err,
      data: data,
    },
  };
};

let bulkRequestAcceptAction = (data) => (dispatch) => {

    console.log("inside action",data)
    
  axios.defaults.headers.common["authorization"] = cookie.load("token");
  axios.defaults.withCredentials = true;
  return axios
    .post(
      BACKEND_URL +
        ":" +
        BACKEND_PORT +
        "/community/mycommunities/users/approve", data
    )
    .then((response) => {
      if (response.status === 200) {
        console.log("api response>>>>>>>>>>", response);
        dispatch(successBulkAcceptRequest(response, data));
      }
    })
    .catch((err) => {
      dispatch(errorBulkAcceptRequest(err, data));
    });
};

export default bulkRequestAcceptAction;
