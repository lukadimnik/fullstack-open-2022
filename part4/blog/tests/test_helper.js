const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'Nekje na dolenjskem',
    author: 'Francek Dolgouhec',
    url: 'www.matkurja.si/dolenjska',
    likes: 2,
    id: '6225ff2907a94c03aef78979',
    user: '623223dd03624c07ade5bfa0',
  },
  {
    title: 'Dosti je bilo',
    author: 'Kita Muhira',
    url: 'www.naganajasi.si/kobajagi',
    likes: 5,
    id: '62260040d453461abb8d09c7',
    user: '623223dd03624c07ade5bfa0',
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Razbojnik',
    author: 'Franjo Petek',
    url: 'www.matkurja.si/dolenjska',
    likes: 14,
    user: '623223dd03624c07ade5bfa0',
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  usersInDb,
};
