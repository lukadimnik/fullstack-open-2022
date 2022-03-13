const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const logger = require('../utils/logger');

usersRouter.get('/', async (request, response) => {
  logger.info('sending all users');
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    });
  } else if (password.length < 3) {
    return response.status(400).json({
      error: 'password needs to be at least 3 characters long',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    passwordHash,
  });

  logger.info(`creating a new user with the name of ${username}`);
  const savedUser = await user.save(user);

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
