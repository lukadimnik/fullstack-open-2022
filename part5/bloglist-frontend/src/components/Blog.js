import { useState } from 'react';
import { updateBlog } from '../services/blogs';

const Blog = ({ blog, updateBlogsState }) => {
  const [expandDetails, setExpandDetails] = useState(false);
  console.log('blog', blog);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'block',
  };

  const handleLikeClick = async () => {
    console.log('triggered', blog);
    const payload = {
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    const updatedBlog = await updateBlog(payload);
    updateBlogsState(updatedBlog);
    console.log('updatedBlog', updatedBlog);
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
          <button onClick={handleLikeClick}>like</button>
        </td>
      </tr>
    </>
  );
};

export default Blog;
