import axios from 'axios';
import { BACKEND_URL } from '../config/config'
import { BACKEND_PORT } from '../config/config'

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
    alert(data.type)
    if (data.type == "text") {
        formData.append("type", data.type);
        formData.append("description", data.description)
        formData.append("community_id", data.communityId)
        formData.append("title", data.title)
    }

    else if (data.type == "link") {
        alert(data.type)
        alert(data.link)
        formData.append("type", data.type);
        formData.append("link", data.link)
        formData.append("community_id", data.communityId)
        formData.append("title", data.title)
    }

    else {
        formData.append("type", data.type);
        for (var x = 0; x < data.pictures.length; x++) {
            formData.append("postImage", data.pictures[x]);
        }
        formData.append("community_id", data.communityId)
        formData.append("title", data.title)
    }
    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    return axios
        .post(BACKEND_URL + ":" + BACKEND_PORT + '/post/create', formData, {
            headers: Object.assign(
                { "content-type": "multipart/form-data" }
            )
        })
        .then((response) => {
            if (response.status === 200) {
                dispatch(successPost(response, data));
            }
        })
        .catch((err) => {
            dispatch(errorPost(err, data))
        });
}

export default createPostAction