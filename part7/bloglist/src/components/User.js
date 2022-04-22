import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const id = useParams().id;
  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === id)
  );

  if (!user) {
    return <p>Cant find user with id: {id}</p>;
  }

  return (
    <>
      <h1>User: {user.username}</h1>
      <h3>Added blogs:</h3>
      <ul>
        {user.blogs.map((blog, i) => (
          <li key={i}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
