import React from 'react';
import { useSelector } from 'react-redux';

const Users = () => {
  const users = useSelector((state) => state.users.users);
  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>name</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
