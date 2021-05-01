import axios from 'axios';
import { BACKEND_URL } from '../../config/config';
import { BACKEND_PORT } from '../../config/config';
import cookie from "react-cookies";


const POST_GET_SUCCESS = "post_get_success";
const POST_GET_FAIL = "post_get_fail";
var success = (response) => {
    return {
        type: POST_GET_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = (err) => {
    console.log("err", err)
    return {
        type: POST_GET_FAIL,
        payload: {
            response: err
        }
    }
}
var getPostsByIDAction = (data) => (dispatch) => {
    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    console.log(data);
    return axios
        .get(BACKEND_URL + ":" + BACKEND_PORT + "/community/posts?orderByDate=1&orderByPopularity=0&pageNumber=1&pageSize=3&community_id=608bcd1a6589fd7200e3e27f").then(response => {
            if (response.status === 200) {
                console.log(response.data)
                dispatch(success(response, data));

            }
        }).catch((err) => {
            dispatch(error(err, data))
        });
}

export default getPostsByIDAction