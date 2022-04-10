import { createSlice } from '@reduxjs/toolkit';

const notification = 'Some message';

const initialState = notification;

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationText(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return '';
    },
  },
});

export const { setNotificationText, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    const miliseconds = parseInt(`${seconds}000`);
    dispatch(setNotificationText(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, miliseconds);
  };
};
