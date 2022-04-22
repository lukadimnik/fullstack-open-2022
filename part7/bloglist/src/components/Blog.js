import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { increaseLike, removeBlog } from '../reducers/blogReducer';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <tr className={`blog__${blog.title.split(' ').join('')}`} style={blogStyle}>
      <td className="title">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </td>
      <td className="author">{blog.author}</td>
      <td>
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
