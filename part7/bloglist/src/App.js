import { useState, useEffect, useRef } from 'react';
import {
  createNewBlog,
  deleteBlog,
  getAll,
  setToken,
  updateBlog,
} from './services/blogs';
import loginService from './services/login';
import Login from './components/Login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import './index.css';
import Togglable from './components/Togglable';
import Bloglist from './components/Bloglist';
import { useDispatch } from 'react-redux';
import { displayNotification } from './reducers/notificationReducer';

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const blogFormRef = useRef();

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const addNewBlog = async (newBlogData) => {
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await createNewBlog(newBlogData);
      setBlogs([...blogs, newBlog]);
      showNotification({
        message: `Blog: ${newBlog.title} added successfully`,
        type: 'notification',
      });
    } catch (error) {
      showNotification({
        message: 'Failed to add a new blog',
        type: 'error',
      });
      console.log('blog creation failed', error);
    }
  };

  const updateBlogsState = (updatedBlog) => {
    const blogsCopy = blogs.filter((blog) => blog.id !== updatedBlog.id);
    setBlogs([...blogsCopy, updatedBlog]);
  };

  const deleteBlogHandler = async (deletedBlogId) => {
    try {
      await deleteBlog(deletedBlogId);
      const blogsCopy = blogs.filter((blog) => blog.id !== deletedBlogId);
      setBlogs([...blogsCopy]);
      showNotification({
        message: 'Blog successfully deleted',
        type: 'notification',
      });
    } catch (error) {
      showNotification({
        message: 'Failed to delete the blog',
        type: 'error',
      });
    }
  };

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const showNotification = (notification) => {
    displayNotification(notification);
    dispatch(displayNotification(notification));
    setTimeout(() => displayNotification({}), 3000);
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      console.log('logging with', username, password);
      const user = await loginService(username, password);
      setUser(user);
      setToken(user.token);
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
      showNotification({
        message: `successful login of: ${user.username}`,
        type: 'notification',
      });
    } catch (error) {
      showNotification({
        message: 'incorrect username or password',
        type: 'error',
      });
      console.log('something went wrong', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogAppUser');
  };

  const handleLikeClick = async (blog) => {
    const payload = {
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    const updatedBlog = await updateBlog(payload);
    updateBlogsState(updatedBlog);
  };

  const renderBlogs = () => {
    return (
      <>
        <h1>BLOGS</h1>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm
            showNotification={showNotification}
            addNewBlog={addNewBlog}
          />
        </Togglable>
        <Bloglist
          blogs={blogs}
          updateBlogsState={updateBlogsState}
          deleteBlog={deleteBlogHandler}
          handleLikeClick={handleLikeClick}
        />
      </>
    );
  };

  return (
    <div>
      <Notification />
      {user ? (
        renderBlogs()
      ) : (
        <Login
          username={username}
          password={password}
          onUsernameChange={handleUsernameChange}
          onPasswordChange={handlePasswordChange}
          onHandleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
