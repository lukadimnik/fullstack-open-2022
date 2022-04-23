const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger');
const Comment = require('../models/comment');

blogsRouter.get('/', async (request, response) => {
  logger.info('Fetching blogs');
  const blogs = await Blog.find({})
    .populate('user', {
      username: 1,
      name: 1,
      id: 1,
    })
    .populate('comments', {
      content: 1,
    });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  logger.info('creating a new blog');
  const payload = request.body;
  const user = request.user;

  if (!user || !user.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (!Object.keys(payload).includes('likes')) {
    payload.likes = 0;
  }

  const userFromDb = await User.findById(user.id);

  if (!userFromDb) {
    return response.status(400).json({
      error: 'user with provided id does not exist',
    });
  }

  const blog = new Blog({ ...payload, user: userFromDb._id });
  const savedBlog = await blog.save();
  userFromDb.blogs = userFromDb.blogs.concat(savedBlog._id);
  await userFromDb.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user;
  if (!user && !user.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const id = request.params.id;
  const blogToDelete = await Blog.findById(id);

  if (!blogToDelete) {
    return response.status(204).end();
  }

  if (blogToDelete.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ error: 'unauthorised to delete this blog' });
  }

  logger.info(`deleting a blog with the id: ${id}`);
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const updatedBlogPayload = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogPayload, {
    new: true,
    runValidators: true,
    context: 'query',
  });

  response.json(updatedBlog);
});

blogsRouter.post('/:id/comments', async (request, response) => {
  logger.info('creating a comment');
  const id = request.params.id;
  const payload = request.body;

  const blogFromDb = await Blog.findById(id);

  const comment = new Comment({ ...payload, blog: blogFromDb._id });
  const savedComment = await comment.save();
  blogFromDb.comments = blogFromDb.comments.concat(savedComment._id);
  await blogFromDb.save();
  response.status(201).json(savedComment);
});

module.exports = blogsRouter;
