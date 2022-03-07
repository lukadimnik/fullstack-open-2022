/* eslint-disable no-unused-vars */
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

module.exports = { dummy, totalLikes, favoriteBlog };
