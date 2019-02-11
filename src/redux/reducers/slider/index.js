import { SET_SLIDER_DATA } from '../../actions/slider';

export const sliderReducer = (state={}, action) => {
    switch (action.type) {
        case SET_SLIDER_DATA:
            return Object.assign({}, action.payload);
        default:
            return state;
    }
}