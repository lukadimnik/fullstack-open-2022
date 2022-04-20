import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewBlog } from '../reducers/blogReducer';

const BlogForm = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleBlogFormSubmit = (event) => {
    event.preventDefault();
    dispatch(addNewBlog({ title, author, url }));
    toggleForm();
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
            id="titleInput"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Athor:
          <input
            id="authorInput"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            id="urlInput"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-blog-button" type="submit">
          create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
