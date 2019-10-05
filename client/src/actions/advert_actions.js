import axios from 'axios';
import {
    ADD_ADVERT,
    CLEAR_ADVERT,
    GET_ADVERTS_BY_TRAINER,
    GET_ADVERT_BY_ID,
    CLEAR_ADVERT_BY_ID,
    UPDATE_ADVERT,
    GET_ADVERTS_TO_CLIENT,
    ADD_AVAILABLE_TO_ADVERT

} from "./types";

import {ADVERT_SERVER} from "../components/utils/misc";

export function addAdvert(dataToSubmit) {
    const request = axios.post( `${ADVERT_SERVER}/add`,dataToSubmit)
        .then(response => response.data);

    return {
        type: ADD_ADVERT,
        payload: request
    }
}

export function clearAdvert(){
    return {
        type: CLEAR_ADVERT,
        payload: ''
    }
}

export function getAdvertsByTrainer(id,limit){
    const request = axios.get(`${ADVERT_SERVER}/adverts_by_trainer_id?id=${id}&limit=${limit}`)
        .then(response=>response.data);

    return {
        type: GET_ADVERTS_BY_TRAINER,
        payload: request
    }
}

export function getAdvertById(id) {
    const request = axios.get(`${ADVERT_SERVER}/adverts_by_id?id=${id}`)
        .then(response=>response.data);

    return {
        type: GET_ADVERT_BY_ID,
        payload: request
    }
}

export function clearAdvertById() {
    return {
        type: CLEAR_ADVERT_BY_ID,
        payload: ''
    }
}

export function updateAdvert(dataToSubmit) {
    const request = axios.post( `${ADVERT_SERVER}/update_advert`,dataToSubmit)
        .then(response => response.data);

    return {
        type: UPDATE_ADVERT,
        payload: request
    }
}

export function getAdvertsToClient(skip,limit,filters=[],previousState=[]){
    const data = {
        limit,
        skip,
        filters
    }

    const request = axios.post(`${ADVERT_SERVER}/adverts_to_client`,data)
        .then(response=>{
            let newState = [
                ...previousState,
                ...response.data.adverts
            ]

            return {
                size:response.data.size,
                adverts:newState
            }
        });

    return {
        type: GET_ADVERTS_TO_CLIENT,
        payload: request
    }
}

export function addAvailableToAdvert(_id,advertDetail) {
    const data = {
        _id,
        advertDetail
    }
    const request = axios.post( `${ADVERT_SERVER}/available`,data)
        .then(response => response.data);

    return {
        type: ADD_AVAILABLE_TO_ADVERT,
        payload: request
    }
}
