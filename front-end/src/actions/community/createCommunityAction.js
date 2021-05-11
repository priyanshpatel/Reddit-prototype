//author - Het 
import axios from 'axios';
import { BACKEND_URL, BACKEND_PORT } from '../../config/config';

const CREATE_COMMUNITY_SUCCESS = "create_community_success";
const CREATE_COMMUNITY_FAIL = "create_community_fail";
var successCommunity = (response, data) => {
    return {
        type: CREATE_COMMUNITY_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}
var errorCommunity = (err, data) => {
    return {
        type: CREATE_COMMUNITY_FAIL,
        payload: {
            response: err,
            data: data
        }
    }
}
var createCommunityAction = (data) => (dispatch) => {
    return axios
        .post(BACKEND_URL + ":" + BACKEND_PORT + '/community/create', data, {
            headers: Object.assign(
                { "content-type": "multipart/form-data" }
            )
        })
        .then((response) => {
            if (response.status === 200) {
                dispatch(successCommunity(response, data));
            }
        })
        .catch((err) => {
            dispatch(errorCommunity(err, data))
        });
}

export default createCommunityAction