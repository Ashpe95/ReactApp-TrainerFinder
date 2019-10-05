import {
    ADD_RESERVATION,
    CLEAR_RESERVATION,
    GET_RESERVATIONS_BY_DAY,
    GET_RESERVATIONS_BY_CLIENT,
    GET_RESERVATIONS_BY_TRAINER
} from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case ADD_RESERVATION:
            return { ...state, addReservation: action.payload }
        case CLEAR_RESERVATION:
            return { ...state, addReservation: action.payload }
        case GET_RESERVATIONS_BY_DAY:
            return { ...state, getReservationsByDay: action.payload }
        case GET_RESERVATIONS_BY_CLIENT:
            return { ...state, getReservationsByClient: action.payload }
        case GET_RESERVATIONS_BY_TRAINER:
            return { ...state, getReservationsByTrainer: action.payload }
        default:
            return state;
    }
}