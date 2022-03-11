const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
  logger.info('Fetching blogs');
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  logger.info('creating a new blog');
  const payload = request.body;
  if (!Object.keys(payload).includes('likes')) {
    payload.likes = 0;
  }
  const blog = new Blog(payload);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;
  logger.info(`deleting a blog with the id: ${id}`);
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

module.exports = blogsRouter;
