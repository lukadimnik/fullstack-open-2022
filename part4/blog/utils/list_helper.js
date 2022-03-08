/* eslint-disable no-unused-vars */
const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((prev, cur) => cur.likes + prev, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) {
    return null;
  }
  let mostLikes = 0;
  blogs.forEach((blog) => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes;
    }
  });
  return blogs.find((blog) => blog.likes === mostLikes);
};

const mostBlogs = (blogs) => {
  const authors = _.uniq(blogs.map((blog) => blog.author)).map((author) => {
    return { author, blogs: 0 };
  });
  const authorsWithBlogs = {};
  authors.forEach((author) => (authorsWithBlogs[author.author] = 0));
  blogs.forEach((blog) => (authorsWithBlogs[blog.author] += 1));
  let authorWithMostBlogs = authors[0];
  Object.keys(authorsWithBlogs).forEach((author) => {
    if (authorsWithBlogs[author] > authorWithMostBlogs.blogs) {
      return (authorWithMostBlogs = {
        author,
        blogs: authorsWithBlogs[author],
      });
    }
  });

  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  const authors = _.uniq(blogs.map((blog) => blog.author)).map((author) => {
    return { author, likes: 0 };
  });
  const authorsWithLikes = {};
  authors.forEach((author) => (authorsWithLikes[author.author] = 0));
  blogs.forEach((blog) => (authorsWithLikes[blog.author] += blog.likes));
  let authorWithMostLikes = authors[0];
  Object.keys(authorsWithLikes).forEach((author) => {
    if (authorsWithLikes[author] > authorWithMostLikes.likes) {
      return (authorWithMostLikes = {
        author,
        likes: authorsWithLikes[author],
      });
    }
  });

  return authorWithMostLikes;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
