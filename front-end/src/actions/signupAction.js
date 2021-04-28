import axios from 'axios';
import { BACKEND_URL, BACKEND_PORT } from '../config/config'
const SIGNUP_SUCCESS = "signup_success";
const SIGNUP_FAILED = "signup_failed";

var successUser = (response, data) => {
    return {
        type: SIGNUP_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}

var errorUser = (err, data) => {
    return {
        type: SIGNUP_FAILED,
        payload: {
            response: err,
            data: data
        }
    }
}


var SignUpAction = (data) => (dispatch) => {
    console.log("API URL >>>>>>>>>>>>")
    console.log(BACKEND_URL + ":" + BACKEND_PORT + '/user/signup', data)
    return axios
        .post(BACKEND_URL + ":" + BACKEND_PORT + '/user/signup', data)
        .then((response) => {
            dispatch(successUser(response, data))
        }).catch((err) => {
            dispatch(errorUser(err, data))
        });
}

export default SignUpAction