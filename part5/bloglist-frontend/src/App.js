import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { getAll, setToken } from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      console.log('logging with', username, password);
      const user = await loginService(username, password);
      setUser(user);
      setToken(user.token);
    } catch (error) {
      console.log('something went wrong', error);
    }
  };

  const renderLogin = () => {
    return (
      <>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </>
    );
  };

  const renderBlogs = () => {
    return (
      <>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  };

  return <div>{user ? renderBlogs() : renderLogin()}</div>;
};

export default App;
