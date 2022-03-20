import { useState } from 'react';

const Blog = ({ blog }) => {
  const [expandDetails, setExpandDetails] = useState(false);
  console.log('blog', blog);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <>
      <tr style={blogStyle}>
        <td>{blog.title}</td>
        <td>{blog.author}</td>
        {expandDetails && (
          <>
            <td>{blog.url}</td>
            <td>{blog.likes}</td>
            <td>{blog.user ? blog.user.username : 'unknown user'}</td>
          </>
        )}
        <td>
          <button onClick={() => setExpandDetails((prevVal) => !prevVal)}>
            {expandDetails ? 'hide' : 'view'}
          </button>
        </td>
      </tr>
    </>
  );
};

export default Blog;
