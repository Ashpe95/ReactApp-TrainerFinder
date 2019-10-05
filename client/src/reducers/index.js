import { combineReducers } from 'redux';
import user from './user_reducer';
import advert from './advert_reducer';
import reservation from './reservation_reducer';

const rootReducer = combineReducers({
    user,
    advert,
    reservation
});

export default rootReducer;