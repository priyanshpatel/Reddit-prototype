import axios from 'axios';
import { BACKEND_URL } from '../../config/config';
import { BACKEND_PORT } from '../../config/config';
import cookie from "react-cookies";


const DOWNVOTE_COMMENT_GET_SUCCESS = "downvote_comment_get_success";
const DOWNVOTE_COMMENT_GET_FAIL = "downvote_comment_get_fail";
var success = (response) => {
    return {
        type: DOWNVOTE_COMMENT_GET_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = (err) => {
    console.log("err", err)
    return {
        type: DOWNVOTE_COMMENT_GET_FAIL,
        payload: {
            response: err
        }
    }
}
var downVoteCommentAction = (data) => (dispatch) => {
    console.log(data);
    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    return axios
        .post(BACKEND_URL + ":" + BACKEND_PORT + "/post/comment/downvote", data).then(response => {
            if (response.status === 200) {
                console.log(response.data)
                dispatch(success(response, data));

            }
        }).catch((err) => {
            dispatch(error(err, data))
        });
}

export default downVoteCommentAction