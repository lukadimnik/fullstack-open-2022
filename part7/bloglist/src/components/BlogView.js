import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addNewComment, increaseLike } from '../reducers/blogReducer';

const BlogView = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const [comment, setComment] = useState('');
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  if (!blog) {
    return null;
  }

  const handleCommentButtonClick = () => {
    dispatch(addNewComment(id, comment));
  };

  return (
    <>
      <h1>{blog.title}</h1>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <p>
        {blog.likes} likes{' '}
        <button onClick={() => dispatch(increaseLike(blog))}>like</button>
      </p>
      <p>Added by {blog.user ? blog.user.username : 'anonymous'}</p>
      <h2>Comments:</h2>
      <input
        type="text"
        name="comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button onClick={handleCommentButtonClick}>add comment</button>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment.content}</li>
        ))}
      </ul>
    </>
  );
};

export default BlogView;
