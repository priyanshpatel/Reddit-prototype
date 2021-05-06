import axios from 'axios';
import { BACKEND_URL } from '../../config/config';
import { BACKEND_PORT } from '../../config/config';
import cookie from "react-cookies";


const DOWNVOTE_GET_SUCCESS = "downvote_get_success";
const DOWNVOTE_GET_FAIL = "downvote_get_fail";
var success = (response) => {
    return {
        type: DOWNVOTE_GET_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = (err) => {
    console.log("err", err)
    return {
        type: DOWNVOTE_GET_FAIL,
        payload: {
            response: err
        }
    }
}
var downVotePostAction = (data) => (dispatch) => {
    console.log(data);
    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    return axios
        .post(BACKEND_URL + ":" + BACKEND_PORT + "/post/downvote", data).then(response => {
            if (response.status === 200) {
                console.log(response.data)
                dispatch(success(response, data));

            }
        }).catch((err) => {
            dispatch(error(err, data))
        });
}

export default downVotePostAction