const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
  logger.info('Fetching blogs');
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  logger.info('creating a new blog');
  try {
    const payload = request.body;
    if (!Object.keys(payload).includes('likes')) {
      payload.likes = 0;
    }
    const blog = new Blog(payload);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
