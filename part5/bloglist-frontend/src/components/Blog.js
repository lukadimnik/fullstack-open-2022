import { useState } from 'react';
import { deleteBlog } from '../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({ blog, deleteBlogFromState, handleLikeClick }) => {
  const [expandDetails, setExpandDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'block',
  };

  const handleDeleteClick = async () => {
    if (window.confirm(`Are you sure you want to remove: ${blog.title}`)) {
      await deleteBlog(blog.id);
      deleteBlogFromState(blog.id);
    }
  };

  return (
    <tr className={`blog__${blog.title.split(' ').join('')}`} style={blogStyle}>
      <td className='title'>{blog.title}</td>
      <td className='author'>{blog.author}</td>
      {expandDetails && (
        <>
          <td className='url'>{blog.url}</td>
          <td className='likes'>{blog.likes}</td>
          <td className='username'>
            {blog.user ? blog.user.username : 'unknown user'}
          </td>
        </>
      )}
      <td>
        <button onClick={() => setExpandDetails((prevVal) => !prevVal)}>
          {expandDetails ? 'hide' : 'view'}
        </button>
        <button onClick={() => handleLikeClick(blog)}>like</button>
        <button onClick={handleDeleteClick}>delete</button>
      </td>
    </tr>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogsState: PropTypes.func.isRequired,
  deleteBlogFromState: PropTypes.func.isRequired,
};

export default Blog;
