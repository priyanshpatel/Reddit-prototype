import axios from 'axios';
import { BACKEND_URL } from '../../config/config';
import { BACKEND_PORT } from '../../config/config';
import cookie from "react-cookies";


const COMMUNITY_GET_SUCCESS = "community_get_success";
const COMMUNITY_GET_FAIL = "community_get_fail";
var success = (response) => {
    return {
        type: COMMUNITY_GET_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = (err) => {
    console.log("err", err)
    return {
        type: COMMUNITY_GET_FAIL,
        payload: {
            response: err
        }
    }
}
var getCommunityByIDAction = (data) => (dispatch) => {
    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    console.log(data);
    return axios
        .get(BACKEND_URL + ":" + BACKEND_PORT + "/community/get?communityId=" + data).then(response => {
            if (response.status === 200) {
                console.log(response.data)
                dispatch(success(response, data));

            }
        }).catch((err) => {
            dispatch(error(err, data))
        });
}

export default getCommunityByIDAction