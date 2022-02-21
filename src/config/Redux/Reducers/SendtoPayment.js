// import * as actions from "../Actions/actionTypes";

const INITIAL_STATE = {};

const sendDataToPayment = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SEND_DATA_TO_PAYMENT':
       return { ...action};

    default:
      return state;
  }
};
export default sendDataToPayment;
