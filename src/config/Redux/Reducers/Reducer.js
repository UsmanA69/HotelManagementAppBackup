import sendDataToPayment from "./SendtoPayment";
import getSelectedHotel from './getSelectedHotel';
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    sendDataToPayment,
    getSelectedHotel,
});

export default rootReducer;
