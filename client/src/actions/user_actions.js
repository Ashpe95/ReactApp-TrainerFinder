import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    UPDATE_DATA_USER,
    CLEAR_UPDATE_DATA_USER,
    GET_USER_BY_ID
} from "./types";

import { USER_SERVER } from "../components/utils/misc";

export function loginUser(dataToSubmit){

    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
        .then(response=>response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response=>response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
        .then(response=>response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response=>response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function updateUserData(dataToSubmit) {
    const request = axios.post( `${USER_SERVER}/update_profile`,dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_DATA_USER,
        payload: request
    }
}

export function clearUpdateUser() {
    return {
        type: CLEAR_UPDATE_DATA_USER,
        payload: ''
    }
}

export function getUserByID(id) {
    const request = axios.get( `${USER_SERVER}/get_user_by_id?id=${id}`)
        .then(response => response.data);

    return {
        type: GET_USER_BY_ID,
        payload: request
    }
}