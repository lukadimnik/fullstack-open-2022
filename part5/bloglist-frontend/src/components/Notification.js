import React from 'react';

const Notification = (props) => {
  const { type, message } = props.notification;
  console.log('type, message', type, message);
  return <h1 className={type}>{message}</h1>;
};

export default Notification;
