// Created by Priyansh Patel
import axios from 'axios';
import { BACKEND_URL, BACKEND_PORT } from '../../config/config';
import cookie from "react-cookies";
const GET_ALL_COMMUNITIES_SUCCESS = "get_all_communities_success";
const GET_ALLCOMMUNITIES_FAIL = "get_all_communities_fail";
let successGetAllCommunities = (response, data) => {
    return {
        type: GET_ALL_COMMUNITIES_SUCCESS,
        payload: {
            response: response,
            data: data
        }
    }
}
let errorGetAllCommunities = (err, data) => {
    return {
        type: GET_ALLCOMMUNITIES_FAIL,
        payload: {
            response: err,
            data: data
        }
    }
}
let myCommunitiesAction = (data) => (dispatch) => {
    axios.defaults.headers.common["authorization"] = cookie.load('token')
    axios.defaults.withCredentials = true;
    return axios
        .get(BACKEND_URL + ":" + BACKEND_PORT + '/community/search?searchKeyword=' + data.searchInput + "&pageSize=" + data.pageSize + "&pageIndex=" + data.pageNumber + "&sortOrder=" + data.sorting + "&sortBy=" + data.select)
        .then((response) => {
            if (response.status === 200) {
                console.log("api response>>>>>>>>>>", response)
                dispatch(successGetAllCommunities(response));
            }
        })
        .catch((err) => {
            dispatch(errorGetAllCommunities(err))
        });
}

export default myCommunitiesAction;