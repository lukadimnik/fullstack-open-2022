const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
  const response = await api.post('/api/login').send({
    username: 'batman',
    password: 'sekret',
  });
  token = `Bearer ${response.body.token}`;
});

describe('getting all blogs', () => {
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
});

describe('adding a blog', () => {
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
      .set('Authorization', token)
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
      .set('Authorization', token)
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

    await api
      .post('/api/blogs')
      .send(blogMissingTitle)
      .set('Authorization', token)
      .expect(400);
    await api
      .post('/api/blogs')
      .send(blogMissingUrl)
      .set('Authorization', token)
      .expect(400);

    await api
      .post('/api/blogs')
      .send(blogMissingUrlTitle)
      .set('Authorization', token)
      .expect(400);
  });

  test('creating a blog without a token responds with 401 unauthorized', async () => {
    const newBlog = {
      title: 'Letalo',
      author: 'Franjo Petek',
      url: 'www.matkurja.si/dolenjska',
      likes: 8,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});

test('every blog has a unique property called id', async () => {
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd[0]).toHaveProperty('id');
  expect(blogsAtEnd[0].id).toBeDefined();
});

describe('deleting a blog', () => {
  test('if the id is valid it responds with status 204', async () => {
    const newBlog = {
      title: 'Sladoled',
      author: 'Ido Smith',
      url: 'www.google.si',
      likes: 16,
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', token)
      .expect(201);
    const createdBlog = response.body;

    const blogsAtStart = await helper.blogsInDb();

    await api
      .delete(`/api/blogs/${createdBlog.id}`)
      .set('Authorization', token)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);
    expect(titles).not.toContain(createdBlog.title);
  });

  test('if the id does not exist it responds with status 204', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const nonExistingId = await helper.nonExistingId();

    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .set('Authorization', token)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test('if the id is not in the right format it responds with status 400', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const nonExistingId = '123484';

    await api
      .delete(`/api/blogs/${nonExistingId}`)
      .set('Authorization', token)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });
});

describe('updating a blog', () => {
  test('with only likes in the payload will only update likes field', async () => {
    const updatePayload = {
      likes: 50,
    };
    const blogsAtStart = await helper.blogsInDb();
    const updatedBlogAtStart = blogsAtStart[0];
    expect(updatedBlogAtStart).toHaveProperty('title', 'Nekje na dolenjskem');
    expect(updatedBlogAtStart).toHaveProperty('author', 'Francek Dolgouhec');
    expect(updatedBlogAtStart).toHaveProperty(
      'url',
      'www.matkurja.si/dolenjska'
    );
    expect(updatedBlogAtStart).toHaveProperty('likes', 2);

    await api
      .put(`/api/blogs/${updatedBlogAtStart.id}`)
      .send(updatePayload)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const updatedBlogAtEnd = await Blog.findById(updatedBlogAtStart.id);
    expect(updatedBlogAtEnd).toHaveProperty('title', 'Nekje na dolenjskem');
    expect(updatedBlogAtEnd).toHaveProperty('author', 'Francek Dolgouhec');
    expect(updatedBlogAtEnd).toHaveProperty('url', 'www.matkurja.si/dolenjska');
    expect(updatedBlogAtEnd).toHaveProperty('likes', 50);
  });

  test('with valid id and valid payload updates the blog fields', async () => {
    const updatePayload = {
      title: 'Danger in the woods',
      author: 'Fingolfin',
      url: 'www.matkurja.si',
      likes: 55,
    };
    const blogsAtStart = await helper.blogsInDb();
    const updatedBlogAtStart = blogsAtStart[0];
    expect(updatedBlogAtStart).toHaveProperty('title', 'Nekje na dolenjskem');
    expect(updatedBlogAtStart).toHaveProperty('author', 'Francek Dolgouhec');
    expect(updatedBlogAtStart).toHaveProperty(
      'url',
      'www.matkurja.si/dolenjska'
    );
    expect(updatedBlogAtStart).toHaveProperty('likes', 2);

    await api
      .put(`/api/blogs/${updatedBlogAtStart.id}`)
      .send(updatePayload)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const updatedBlogAtEnd = await Blog.findById(updatedBlogAtStart.id);
    expect(updatedBlogAtEnd).toHaveProperty('title', 'Danger in the woods');
    expect(updatedBlogAtEnd).toHaveProperty('author', 'Fingolfin');
    expect(updatedBlogAtEnd).toHaveProperty('url', 'www.matkurja.si');
    expect(updatedBlogAtEnd).toHaveProperty('likes', 55);
  });
});

afterAll(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
  mongoose.connection.close();
});
