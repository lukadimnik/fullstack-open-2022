import { createSlice } from '@reduxjs/toolkit';
import {
  createNewBlog,
  deleteBlog,
  getAll,
  updateBlog,
} from '../services/blogs';
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
    deleteBlogFromState(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    addLlike(state, action) {
      const id = action.payload;
      return state.map((blog) => {
        if (blog.id === id) {
          return { ...blog, likes: blog.likes + 1 };
        }
        return blog;
      });
    },
  },
});

export const { setBlogs, appendBlog, deleteBlogFromState, addLlike } =
  blogSlice.actions;
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

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await deleteBlog(id);
      dispatch(deleteBlogFromState(id));
      dispatch(
        displayNotification({
          message: 'Blog successfully deleted',
          type: 'notification',
        })
      );
    } catch (error) {
      dispatch(
        displayNotification({
          message: 'Failed to delete the blog',
          type: 'error',
        })
      );
    }
  };
};

export const increaseLike = (blog) => {
  return async (dispatch) => {
    const blogWithUpdatedLikes = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await updateBlog(blogWithUpdatedLikes);
    dispatch(addLlike(updatedBlog.id));
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await getAll();
    dispatch(setBlogs(blogs));
  };
};
