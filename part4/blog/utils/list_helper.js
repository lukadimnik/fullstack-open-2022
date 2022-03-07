/* eslint-disable no-unused-vars */
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((prev, cur) => cur.likes + prev, 0);
};

module.exports = { dummy, totalLikes };
