import { createSlice } from '@reduxjs/toolkit';

const notification = 'Some message';

const initialState = notification;

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(notification) {
      return notification;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
