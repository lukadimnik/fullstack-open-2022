import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    notifications: notificationReducer,
  },
});

export default store;
