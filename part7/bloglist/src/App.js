import { useState, useEffect, useRef } from 'react';
import { setToken } from './services/blogs';
import loginService from './services/login';
import Login from './components/Login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import './index.css';
import Togglable from './components/Togglable';
import Bloglist from './components/Bloglist';
import { useDispatch, useSelector } from 'react-redux';
import { displayNotification } from './reducers/notificationReducer';
import { initializeBlogs } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      setToken(user.token);
    }
  }, []);

  const toggleForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const showNotification = (notification) => {
    dispatch(displayNotification(notification));
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      console.log('logging with', username, password);
      const user = await loginService(username, password);
      dispatch(setUser(user));
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
    dispatch(setUser(null));
    window.localStorage.removeItem('loggedBlogAppUser');
  };

  const renderBlogs = () => {
    return (
      <>
        <h1>BLOGS</h1>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm toggleForm={toggleForm} />
        </Togglable>
        <Bloglist blogs={blogs} />
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
