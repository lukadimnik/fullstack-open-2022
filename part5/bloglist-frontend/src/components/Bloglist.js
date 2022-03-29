import React from 'react';
import Blog from './Blog';

const Bloglist = ({ blogs, updateBlogsState, deleteBlog, handleLikeClick }) => {
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
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlogsState={updateBlogsState}
              deleteBlog={deleteBlog}
              handleLikeClick={handleLikeClick}
            />
          ))}
      </tbody>
    </table>
  );
};

export default Bloglist;
