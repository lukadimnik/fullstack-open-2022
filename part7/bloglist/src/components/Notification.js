import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const { type, message } = useSelector((state) => state.notifications);

  if (!message) {
    return null;
  }
  return <h1 className={type}>{message}</h1>;
};

export default Notification;
