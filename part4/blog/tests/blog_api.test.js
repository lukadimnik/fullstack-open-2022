const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Nekje na dolenjskem',
    author: 'Francek Dolgouhec',
    url: 'www.matkurja.si/dolenjska',
    likes: 2,
    id: '6225ff2907a94c03aef78979',
  },
  {
    title: 'Dosti je bilo',
    author: 'Kita Muhira',
    url: 'www.naganajasi.si/kobajagi',
    likes: 5,
    id: '62260040d453461abb8d09c7',
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  blogObject.save();
});

test('blogs are returned in the json format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('api returns correct number of blogs from the db', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
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

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const contents = response.body.map((r) => r.title);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(contents).toContain('Razbojnik');
});

afterAll(() => {
  mongoose.connection.close();
});
