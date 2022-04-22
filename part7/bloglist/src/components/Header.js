import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/userReducer';
logout;

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  if (!user) {
    return null;
  }

  return (
    <>
      <h1>BLOGS</h1>
      <p>{user.name} logged in</p>
      <button onClick={() => dispatch(logout())}>logout</button>
    </>
  );
};

export default Header;
