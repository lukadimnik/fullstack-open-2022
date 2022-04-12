import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
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
  clearTimeout(window.timeout)
  return async (dispatch) => {
    const miliseconds = seconds * 1000;
    dispatch(setNotificationText(message));
    window.timeout = setTimeout(() => {
      dispatch(removeNotification());
    }, miliseconds);
  };
};
