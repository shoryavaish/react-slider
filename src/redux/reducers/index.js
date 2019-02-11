import { combineReducers } from 'redux';
import { sliderReducer }  from './slider';

const RootReducer = combineReducers({
    sliderData: sliderReducer
});

export default RootReducer;
