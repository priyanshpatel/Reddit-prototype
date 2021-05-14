//author - Het 
import axios from 'axios';
import cookie from "react-cookies";

import { BACKEND_URL, BACKEND_PORT } from '../../config/config';

const GET_DASHBOARD_DATA_SUCCESS = "get_dashboard_data_success";
const GET_DASHBOARD_DATA_FAIL = "get_dashboard_data_fail";
var successDashboardData = (response, data) => {
    return {
        type: GET_DASHBOARD_DATA_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}
var errorDashboardData = (err, data) => {
    return {
        type: GET_DASHBOARD_DATA_FAIL,
        payload: {
            response: err,
            data: data
        }
    }
}
var getDashboardDataAction = (data) => (dispatch) => {

    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    return axios
        .get(BACKEND_URL + ":" + BACKEND_PORT + '/user/getCommunityAndPost?searchKeyword=' + data.searchInput + "&pageSize=" + data.pageSize + "&pageIndex=" +  data.pageNumber +"&sortBy=" + data.select +  "&sortOrder=" + data.sorting)
        .then((response) => {
            if (response.status === 200) {
                dispatch(successDashboardData(response, data));
            }
        })
        .catch((err) => {
            dispatch(errorDashboardData(err, data))
        });
}

export default getDashboardDataAction