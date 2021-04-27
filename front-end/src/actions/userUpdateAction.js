//author-Het
import axios from 'axios';
import cookie from "react-cookies";
import {BACKEND_URL} from '../config/config';
import {BACKEND_PORT} from '../config/config';

const USER_PROFILE_UPDATE_SUCCESS = "user_profile_update_success";
const USER_PROFILE_UPDATE_FAILED = "user_profile_update_failed";
var success = (response) => {
    return {
        type: USER_PROFILE_UPDATE_SUCCESS,
        payload: {
            response: response,
        }
    }
}

var error = (err) => {
    console.log("err", err)
    return {
        type: USER_PROFILE_UPDATE_FAILED,
        payload: {
            response: err
        }
    }
}
var updateUserProfileAction = (data) => (dispatch) => {
    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    return axios
        .put(BACKEND_URL + ":" + BACKEND_PORT + "/users/editprofile", data).then(response => {
            if (response.status === 200) {
                console.log(response);
                if (cookie.load('name') !== response.data.name) {
                    cookie.remove("name", {
                        path: '/'
                    });
                    cookie.save("name", response.data.name, {
                        path: '/',
                        httpOnly: false,
                        maxAge: 90000
                    })
                }
                dispatch(success(response))
                // window.location.assign('/profile') ;
            }

        }).catch(err => {
            dispatch(error(err))
        })
}

export default updateUserProfileAction