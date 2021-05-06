import axios from 'axios';
import { BACKEND_URL } from '../../config/config';
import { BACKEND_PORT } from '../../config/config';
import cookie from "react-cookies";


const UPVOTE_COMMENT_GET_SUCCESS = "upvote_comment_get_success";
const UPVOTE_COMMENT_GET_FAIL = "upvote_comment_get_fail";
var success = (response) => {
    return {
        type: UPVOTE_COMMENT_GET_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = (err) => {
    console.log("err", err)
    return {
        type: UPVOTE_COMMENT_GET_FAIL,
        payload: {
            response: err
        }
    }
}
var upvoteCommentAction = (data) => (dispatch) => {
    console.log(data);
    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    return axios
        .post(BACKEND_URL + ":" + BACKEND_PORT + "/post/comment/upvote", data).then(response => {
            if (response.status === 200) {
                console.log(response.data)
                dispatch(success(response, data));

            }
        }).catch((err) => {
            dispatch(error(err, data))
        });
}

export default upvoteCommentAction