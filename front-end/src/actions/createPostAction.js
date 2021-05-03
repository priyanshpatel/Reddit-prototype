import axios from 'axios';
import {BACKEND_URL} from '../config/config'
import {BACKEND_PORT} from '../config/config'

import cookie from "react-cookies";
import jwt_decode from "jwt-decode"
const CREATE_POST_SUCCESS = "create_post_success";
const CREATE_POST_FAILED = "create_post_failed";

let successPost = (response, data) => {
    return {
        type: CREATE_POST_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}

let errorPost = (err, data) => {
    return {
        type: CREATE_POST_FAILED,
        payload: {
            response: err,
            data: data
        }
    }
}
let createPostAction = (data) => (dispatch) => {
    let formData = new FormData();
    formData.append("type", data.type);
    formData.append("description", data.description)
    formData.append("postImage", data.postImage)
    formData.append("link", data.link)
    formData.append("community_id", data.communityId)
    formData.append("title", data.title)

    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    axios
        .post(BACKEND_URL + ":" + BACKEND_PORT + '/community/comment/create', formData, {
            headers: Object.assign(
                { "content-type": "multipart/form-data" }
            )
        })
        .then((response) => {
            let decoded = jwt_decode(response.data.split(' ')[1])
            console.log("decoded", decoded)
            if (response.status === 200) {
                dispatch(successPost(response, data));
            }
        })
        .catch((err) => {
            dispatch(errorPost(err, data))
        });
}

export default createPostAction