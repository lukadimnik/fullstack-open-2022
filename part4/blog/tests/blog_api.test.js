const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('blogs are returned in the json format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('api returns correct number of blogs from the db', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('the first blog is about dolenjska region', async () => {
  const response = await api.get('/api/blogs');

  const contents = response.body.map((r) => r.title);

  expect(contents).toContain('Nekje na dolenjskem');
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Razbojnik',
    author: 'Franjo Petek',
    url: 'www.matkurja.si/dolenjska',
    likes: 14,
  };

  const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const savedBlog = postResponse.body;
  expect(savedBlog).toHaveProperty('title', 'Razbojnik');
  expect(savedBlog).toHaveProperty('author', 'Franjo Petek');
  expect(savedBlog).toHaveProperty('url', 'www.matkurja.si/dolenjska');
  expect(savedBlog).toHaveProperty('likes', 14);

  const blogsAtEnd = await helper.blogsInDb();
  const contents = blogsAtEnd.map((r) => r.title);
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(contents).toContain('Razbojnik');
});

test('if request for blog creation has missing likes property it will default to 0', async () => {
  const newBlog = {
    title: 'Razbojnik',
    author: 'Franjo Petek',
    url: 'www.matkurja.si/dolenjska',
  };

  const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const savedBlog = postResponse.body;
  expect(savedBlog).toHaveProperty('likes', 0);
});

test('if request for blog creation has missing title and url properties it will respond with 400', async () => {
  const blogMissingTitle = {
    author: 'Franjo Petek',
    url: 'www.matkurja.si/dolenjska',
    likes: 14,
  };

  const blogMissingUrl = {
    title: 'Razbojnik',
    author: 'Franjo Petek',
    likes: 14,
  };

  const blogMissingUrlTitle = {
    author: 'Franjo Petek',
    likes: 14,
  };

  await api.post('/api/blogs').send(blogMissingTitle).expect(400);
  await api.post('/api/blogs').send(blogMissingUrl).expect(400);
  await api.post('/api/blogs').send(blogMissingUrlTitle).expect(400);
});

test('every blog has a unique property called id', async () => {
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[0]).toHaveProperty('id');
  expect(blogsAtEnd[0].id).toBeDefined();
});

describe('deleting a blog', () => {
  test('if the id is valid it responds with status 204', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0].id;

    await api.delete(`/api/blogs/${blogToDelete}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(blogToDelete.title);
  });

  test('if the id does not exist it responds with status 204', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const nonExistingId = await helper.nonExistingId();

    await api.delete(`/api/blogs/${nonExistingId}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test('if the id is not in the right format it responds with status 400', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const nonExistingId = '123484';

    await api.delete(`/api/blogs/${nonExistingId}`).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
