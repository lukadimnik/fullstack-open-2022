import React, { useState } from 'react';
import { createNewBlog } from '../services/blogs';

const BlogForm = ({ showNotification, addNewBlogToState }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const newBlogData = {
        title,
        author,
        url,
      };
      const newBlog = await createNewBlog(newBlogData);
      addNewBlogToState(newBlog);
      showNotification({
        message: `Blog: ${newBlog.title} added successfully`,
        type: 'notification',
      });
    } catch (error) {
      showNotification({
        message: 'Failed to add a new blog',
        type: 'error',
      });
      console.log('blog creation failed', error);
    }
  };

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={handleBlogFormSubmit}>
        <div>
          Title:
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Athor:
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default BlogForm;
