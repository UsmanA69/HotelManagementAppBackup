
export const SEND_DATA_TO_PAYMENT = (UserData) => ({
  type: "SEND_DATA_TO_PAYMENT",
  UserData
});

export const SEND_USER_UID = (userUid) => ({
  type: "SEND_USER_UID",
  userUid
});

export const GET_SELECTED_HOTEL = (roomData) => ({
  type: "GET_SELECTED_HOTEL",
  roomData
});
