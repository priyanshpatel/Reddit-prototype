import axios from 'axios';
import { BACKEND_URL } from '../../config/config';
import { BACKEND_PORT } from '../../config/config';
import cookie from "react-cookies";


const DOWNVOTE_COMMUNITY_GET_SUCCESS = "downvote_community_get_success";
const DOWNVOTE_COMMUNITY_GET_FAIL = "downvote_community_get_fail";
var success = (response) => {
    return {
        type: DOWNVOTE_COMMUNITY_GET_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = (err) => {
    return {
        type: DOWNVOTE_COMMUNITY_GET_FAIL,
        payload: {
            response: err
        }
    }
}
var downVoteCommunityAction = (data) => (dispatch) => {

    let obj = {
        communityId: data
    }
    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    return axios
        .post(BACKEND_URL + ":" + BACKEND_PORT + "/community/downvote", obj).then(response => {
            if (response.status === 200) {
                console.log(response.data)
                dispatch(success(response, data));

            }
        }).catch((err) => {
            dispatch(error(err, data))
        });
}

export default downVoteCommunityAction