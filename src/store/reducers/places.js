import { SET_PLACES, DELETE_PLACE, INCR_PLACE_ADDED } from '../actions/actionTypes';

const initialState = {
    places: [],
    placeAdded: 0
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_PLACES:
            return {
                ...state,
                places: action.places
            }

        case INCR_PLACE_ADDED:
            return {
                ...state,
                placeAdded: state.placeAdded + 1
            }

        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter((place) => {
                    return place.key !== action.key;
                })
            }
        
        default : 
            return state;
    }
}