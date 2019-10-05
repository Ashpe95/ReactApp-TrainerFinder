import axios from 'axios';
import {
    ADD_RESERVATION,
    CLEAR_RESERVATION,
    GET_RESERVATIONS_BY_DAY,
    GET_RESERVATIONS_BY_CLIENT,
    GET_RESERVATIONS_BY_TRAINER
} from "./types";

import {RESERVATION_SERVER} from "../components/utils/misc";

export function addReservation(dataToSubmit) {
    const request = axios.post( `${RESERVATION_SERVER}/add`,dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_RESERVATION,
        payload: request
    }
}

export function clearReservation() {
    return {
        type: CLEAR_RESERVATION,
        payload: ''
    }
}

export function getReservationsByDay(advert, day, month, year) {
    const data = {
        advert,
        day,
        month,
        year
    }

    const request = axios.post( `${RESERVATION_SERVER}/get_by_day`,data)
        .then(response => response.data);

    return {
        type: GET_RESERVATIONS_BY_DAY,
        payload: request
    }
}

export function getReservationsByClient(id,limit) {
    const request = axios.get( `${RESERVATION_SERVER}/reservations_by_client?id=${id}&limit=${limit}`,)
        .then(response => response.data);

    return {
        type: GET_RESERVATIONS_BY_CLIENT,
        payload: request
    }
}

export function getReservationsByTrainer(id,limit) {
    const request = axios.get( `${RESERVATION_SERVER}/reservations_by_trainer?id=${id}&limit=${limit}`,)
        .then(response => response.data);

    return {
        type: GET_RESERVATIONS_BY_TRAINER,
        payload: request
    }
}
