//author - Het 
import axios from 'axios';
import { BACKEND_URL, BACKEND_PORT } from '../config/config';
import cookie from "react-cookies";

const USER_PROFILE_SUCCESS = "user_profile_success";
const USER_PROFILE_FAIL = "user_profile_fail";
var successGetUserProfile = (response, data) => {
    return {
        type: USER_PROFILE_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}
var errorGetUserProfile = (err, data) => {
    return {
        type: USER_PROFILE_FAIL,
        payload: {
            response: err,
            data: data
        }
    }
}
var userProfileAction = (data) => (dispatch) => {
    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    return axios
        .get(BACKEND_URL + ":" + BACKEND_PORT + '/user/getUserProfile?userId=' + data)
        .then((response) => {
            if (response.status === 200) {
                dispatch(successGetUserProfile(response, data));
            }
        })
        .catch((err) => {
            dispatch(errorGetUserProfile(err, data))
        });
}

export default userProfileAction