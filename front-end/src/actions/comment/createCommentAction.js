//author - Het 
import axios from 'axios';
import { BACKEND_URL, BACKEND_PORT } from '../../config/config';

const CREATE_COMMENT_SUCCESS = "create_comment_success";
const CREATE_COMMENT_FAIL = "create_comment_fail";
var succesComment = (response, data) => {
    return {
        type: CREATE_COMMENT_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}
var errorComment = (err, data) => {
    return {
        type: CREATE_COMMENT_FAIL,
        payload: {
            response: err,
            data: data
        }
    }
}
var createCommentAction = (data) => (dispatch) => {
    return axios
        .post(BACKEND_URL + ":" + BACKEND_PORT + '/post/comment', data)
        .then((response) => {
            if (response.status === 200) {
                dispatch(succesComment(response, data));
            }
        })
        .catch((err) => {
            dispatch(errorComment(err, data))
        });
}

export default createCommentAction