import axios from 'axios';
import {BACKEND_URL} from '../config/config';
import {BACKEND_PORT} from '../config/config';
import cookie from "react-cookies";


const USER_GET_SUCCESS = "user_get_success";
const USER_GET_FAIL = "user_get_fail";
var success = (response) => {
    return {
        type: USER_GET_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = (err) => {
    console.log("err", err)
    return {
        type: USER_GET_FAIL,
        payload: {
            response: err
        }
    }
}
// var userGetByIDAction = (data) => (dispatch) => {
//     axios.defaults.headers.common["authorization"] = cookie.load('token')
//     axios.defaults.withCredentials = true;
//     console.log(data);
//     return axios
//         .get(BACKEND_URL + "/users/userbyid/" + cookie.load('id')).then(response => {
//             if (response.status === 200) {
//                 console.log(response.data)
//                 dispatch(success(response, data));

//             }
//         }).catch((err) => {
//             dispatch(error(err, data))
//         });
// }

let userGetByIDAction = (data) => (dispatch) => {
    console.log("COOKIE in ACTION----------------", cookie.load('userId'))
    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    console.log(data);
    return axios
        .get(BACKEND_URL + ":" + BACKEND_PORT +  "/user/get?userId=" + cookie.load('userId')).then(response => {
            if (response.status === 200){
                console.log("API RESPONSE --------------------", response)
                console.log(response.data)
                dispatch(success(response,data));
            }
        }).catch((err) => {
            dispatch(error(err, data))
        })
}

export default userGetByIDAction