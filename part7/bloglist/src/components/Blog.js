import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { increaseLike, removeBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [expandDetails, setExpandDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'block',
  };
  increaseLike;

  return (
    <tr className={`blog__${blog.title.split(' ').join('')}`} style={blogStyle}>
      <td className="title">{blog.title}</td>
      <td className="author">{blog.author}</td>
      {expandDetails && (
        <>
          <td className="url">{blog.url}</td>
          <td className="likes">{blog.likes}</td>
          <td className="username">
            {blog.user ? blog.user.username : 'unknown user'}
          </td>
        </>
      )}
      <td>
        <button onClick={() => setExpandDetails((prevVal) => !prevVal)}>
          {expandDetails ? 'hide' : 'view'}
        </button>
        <button onClick={() => dispatch(increaseLike(blog))}>like</button>
        <button onClick={() => dispatch(removeBlog(blog.id))}>delete</button>
      </td>
    </tr>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
