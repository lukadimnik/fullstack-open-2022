import React from 'react';

const Login = (props) => {
  const {
    onHandleLogin,
    username,
    password,
    onUsernameChange,
    onPasswordChange,
  } = props;
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onHandleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => onUsernameChange(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => onPasswordChange(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  );
};

export default Login;
