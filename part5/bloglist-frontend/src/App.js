import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { getAll, setToken, createNewBlog } from './services/blogs';
import loginService from './services/login';
import Login from './components/Login';
import Notification from './components/Notification';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notification, setNotification] = useState({});

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

  const handleBlogFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const newBlogData = {
        title,
        author,
        url,
      };
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

  const renderBlogs = () => {
    return (
      <>
        <h1>BLOGS</h1>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <h2>Create new blog</h2>
        <form onSubmit={handleBlogFormSubmit}>
          <div>
            Title:
            <input
              type='text'
              value={title}
              name='Title'
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            Athor:
            <input
              type='text'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            Url:
            <input
              type='text'
              value={url}
              name='Url'
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type='submit'>create</button>
        </form>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
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
