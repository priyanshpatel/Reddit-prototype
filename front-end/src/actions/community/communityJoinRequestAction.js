// Created by Het Brahmbhatt

import axios from 'axios';
import { BACKEND_URL } from '../../config/config';
import { BACKEND_PORT } from '../../config/config';
import cookie from "react-cookies";


const COMMUNITY_JOIN_REQUEST_SUCCESS = "community_join_request_success";
const COMMUNITY_JOIN_REQUEST_FAIL = "community_join_request_fail";
var success = (response) => {
    return {
        type: COMMUNITY_JOIN_REQUEST_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = (err) => {
    return {
        type: COMMUNITY_JOIN_REQUEST_FAIL,
        payload: {
            response: err
        }
    }
}
var communityJoinRequestAction = (data) => (dispatch) => {

    let obj = {
        community_id: data
    }
    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    return axios
        .post(BACKEND_URL + ":" + BACKEND_PORT + "/community/join", obj).then(response => {
            if (response.status === 200) {
                console.log(response.data)
                dispatch(success(response, data));

            }
        }).catch((err) => {
            dispatch(error(err, data))
        });
}

export default communityJoinRequestAction