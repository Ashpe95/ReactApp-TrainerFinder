import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    UPDATE_DATA_USER,
    CLEAR_UPDATE_DATA_USER,
    GET_USER_BY_ID
} from '../actions/types';


export default function(state={},action){
    switch(action.type){
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case LOGOUT_USER:
            return { ...state }
        case UPDATE_DATA_USER:
            return { ...state, updateUser: action.payload }
        case CLEAR_UPDATE_DATA_USER:
            return { ...state, updateUser: action.payload }
        case GET_USER_BY_ID:
            return { ...state, userById: action.payload }
        default:
            return state;
    }
}