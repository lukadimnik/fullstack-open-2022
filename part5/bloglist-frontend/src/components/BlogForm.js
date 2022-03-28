import React, { useState } from 'react';

const BlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogFormSubmit = (event) => {
    event.preventDefault();
    addNewBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={handleBlogFormSubmit}>
        <div>
          Title:
          <input
            id='titleInput'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Athor:
          <input
            id='authorInput'
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            id='urlInput'
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='create-blog-button' type='submit'>
          create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
