import { useState, useEffect, useRef } from 'react';
import { getAll, setToken } from './services/blogs';
import loginService from './services/login';
import Login from './components/Login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import './index.css';
import Togglable from './components/Togglable';
import Bloglist from './components/Bloglist';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [notification, setNotification] = useState({});
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

  const addNewBlogToState = (newBlog) => {
    blogFormRef.current.toggleVisibility();
    setBlogs([...blogs, newBlog]);
  };

  const updateBlogsState = (updatedBlog) => {
    const blogsCopy = blogs.filter((blog) => blog.id !== updatedBlog.id);
    setBlogs([...blogsCopy, updatedBlog]);
  };

  const deleteBlogFromState = (deletedBlogId) => {
    const blogsCopy = blogs.filter((blog) => blog.id !== deletedBlogId);
    setBlogs([...blogsCopy]);
  };

  const handleUsernameChange = (value) => {
    setUsername(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const showNotification = (notification) => {
    console.log('fired', notification);
    setNotification(notification);
    setTimeout(() => setNotification({}), 3000);
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

  const renderBlogs = () => {
    return (
      <>
        <h1>BLOGS</h1>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm
            showNotification={showNotification}
            addNewBlogToState={addNewBlogToState}
          />
        </Togglable>
        <Bloglist
          blogs={blogs}
          updateBlogsState={updateBlogsState}
          deleteBlogFromState={deleteBlogFromState}
        />
      </>
    );
  };

  return (
    <div>
      {Boolean(Object.keys(notification).length) && (
        <Notification notification={notification} />
      )}
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