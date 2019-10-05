import {
    ADD_ADVERT,
    CLEAR_ADVERT,
    GET_ADVERTS_BY_TRAINER,
    GET_ADVERT_BY_ID,
    CLEAR_ADVERT_BY_ID,
    UPDATE_ADVERT,
    GET_ADVERTS_TO_CLIENT,
    ADD_AVAILABLE_TO_ADVERT
} from '../actions/types';

export default function(state={},action){
    switch(action.type){
        case ADD_ADVERT:
            return { ...state, addAdvert: action.payload }
        case CLEAR_ADVERT:
            return { ...state, updateAdvert: action.payload }
        case GET_ADVERTS_BY_TRAINER:
            return { ...state, advertsByTrainer: action.payload }
        case GET_ADVERT_BY_ID:
            return { ...state, advertById: action.payload }
        case CLEAR_ADVERT_BY_ID:
            return { ...state, advertById: action.payload }
        case UPDATE_ADVERT:
            return { ...state, updateAdvert: action.payload }
        case GET_ADVERTS_TO_CLIENT:
            return {
                ...state,
                advertsToClient: action.payload.adverts,
                advertsToClientSize: action.payload.size
            }
        case ADD_AVAILABLE_TO_ADVERT:
            return { ...state, available: action.payload }
        default:
            return state;
    }
}