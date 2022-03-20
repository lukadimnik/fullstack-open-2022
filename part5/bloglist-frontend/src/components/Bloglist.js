import React from 'react';

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
          <tr key={blog.id}>
            <td>{blog.title}</td>
            <td>{blog.author}</td>
            <td>
              <button>View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Bloglist;
