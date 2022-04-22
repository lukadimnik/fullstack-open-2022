import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/userReducer';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  if (!user) {
    return null;
  }

  const padding = {
    paddingRight: 5,
  };

  return (
    <>
      <h1>BLOGS</h1>
      <div className="navbar">
        <div className="navbar-links">
          <Link to="/users" style={padding}>
            users
          </Link>
          <Link to="/" style={padding}>
            blogs
          </Link>
        </div>
        <div className="user-info">
          <p>
            {user.name} logged in{' '}
            <button onClick={() => dispatch(logout())}>logout</button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
