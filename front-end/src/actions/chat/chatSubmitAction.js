//author - Het 
import axios from 'axios';
import { BACKEND_URL, BACKEND_PORT } from '../../config/config';
import cookie from "react-cookies";

const CHAT_SUBMIT_SUCCESS = "chat_submit_success";
const CHAT_SUBMIT_FAIL = "chat_submit_fail";
var successChat = (response, data) => {
    return {
        type: CHAT_SUBMIT_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}
var errorChat = (err, data) => {
    return {
        type: CHAT_SUBMIT_FAIL,
        payload: {
            response: err,
            data: data
        }
    }
}
var chatSubmitAction = (data) => (dispatch) => {

    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    return axios
        .post(BACKEND_URL + ":" + BACKEND_PORT + '/chat/send', data)
        .then((response) => {
            if (response.status === 200) {
                dispatch(successChat(response, data));
            }
        })
        .catch((err) => {
            dispatch(errorChat(err, data))
        });
}

export default chatSubmitAction