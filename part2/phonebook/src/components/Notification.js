import React from 'react';

const Notification = ({ notification }) => {
  return <h1 className={notification.type}>{notification.message}</h1>;
};

export default Notification;
