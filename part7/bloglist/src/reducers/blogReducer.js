import { createSlice } from '@reduxjs/toolkit';
import { createNewBlog } from '../services/blogs';
import { displayNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, appendBlog } = blogSlice.actions;
export default blogSlice.reducer;

export const addNewBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newlyCreatedBlog = await createNewBlog(blog);
      dispatch(appendBlog(newlyCreatedBlog));

      dispatch(
        displayNotification({
          message: `Blog: ${newlyCreatedBlog.title} added successfully`,
          type: 'notification',
        })
      );
    } catch (error) {
      dispatch(
        displayNotification({
          message: 'Failed to add a new blog',
          type: 'error',
        })
      );
    }
  };
};
