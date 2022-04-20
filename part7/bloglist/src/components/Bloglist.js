import React from 'react';
import Blog from './Blog';

const Bloglist = ({ blogs }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Button</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </tbody>
    </table>
  );
};

export default Bloglist;
