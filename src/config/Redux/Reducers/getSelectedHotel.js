const INITIAL_STATE = {};

const getSelectedHotel = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_SELECTED_HOTEL':
       return { ...action};

    default:
      return state;
  }
};
export default getSelectedHotel;
