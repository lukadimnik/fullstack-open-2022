import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    // eslint-disable-next-line no-unused-vars
    removeNotification(state, action) {
      return '';
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;

export const displayNotification = (notification) => {
  clearTimeout(window.timeout);
  return async (dispatch) => {
    dispatch(setNotification(notification));
    window.timeout = setTimeout(() => {
      dispatch(removeNotification());
    }, 4000);
  };
};
