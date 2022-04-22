import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../services/users';

const initalState = {
  user: null,
  users: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState: initalState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUsers(state, action) {
      state.users = [...action.payload];
    },
  },
});

export const { setUser, setUsers } = userSlice.actions;
export default userSlice.reducer;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await getAllUsers();
    dispatch(setUsers(users));
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(setUser(null));
    window.localStorage.removeItem('loggedBlogAppUser');
  };
};
