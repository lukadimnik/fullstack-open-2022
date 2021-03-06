const list_helper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];
  const result = list_helper.dummy(blogs);
  expect(result).toBe(1);
});

const blogs = [
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
  {
    title: 'Dosti je bilo in se vec',
    author: 'Kita Muhira',
    url: 'www.naganajasi.si/kobajagi',
    likes: 4,
    id: '62261632911b32043039908b',
  },
  {
    title: 'Sonce je sijalo',
    author: 'Kita Muhira',
    url: 'www.naganajasi.si/kobajagi',
    likes: 6,
    id: '62262d54bdb244c9d9668e5f',
  },
  {
    title: 'Dosti je bilo in se vec',
    author: 'Kita Muhira',
    url: 'www.naganajasi.si/kobajagi',
    likes: 2,
    id: '622630a4c92ef1e01eaa26bb',
  },
  {
    title: 'Nekje na gorenjskem',
    author: 'Francek Dolgouhec',
    url: 'www.matkurja.si/gorenjska',
    likes: 2,
    id: '6225ff2907a94c03aef78979',
  },
];

const listOfOneBlog = [
  {
    title: 'Nekje na dolenjskem',
    author: 'Francek Dolgouhec',
    url: 'www.matkurja.si/dolenjska',
    likes: 2,
    id: '6225ff2907a94c03aef78979',
  },
];

describe('totalLikes', () => {
  test('when list has one blog, equals correct likes', () => {
    const result = list_helper.totalLikes(listOfOneBlog);
    expect(result).toBe(2);
  });

  test('when list has multiple blogs, equals correct likes', () => {
    const result = list_helper.totalLikes(blogs);
    expect(result).toBe(21);
  });

  test('when list has no blogs, equals 0 likes', () => {
    const result = list_helper.totalLikes([]);
    expect(result).toBe(0);
  });
});

describe('favoriteBlog', () => {
  test('correctly returns the blog with the most likes', () => {
    const result = list_helper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: 'Sonce je sijalo',
      author: 'Kita Muhira',
      url: 'www.naganajasi.si/kobajagi',
      likes: 6,
      id: '62262d54bdb244c9d9668e5f',
    });
  });

  test('if it receives empty array it returns null', () => {
    const result = list_helper.favoriteBlog([]);
    expect(result).toEqual(null);
  });

  test('if it receives array with one blog it returns that blog', () => {
    const result = list_helper.favoriteBlog([
      {
        title: 'Nekje na dolenjskem',
        author: 'Francek Dolgouhec',
        url: 'www.matkurja.si/dolenjska',
        likes: 2,
        id: '6225ff2907a94c03aef78979',
      },
    ]);
    expect(result).toEqual({
      title: 'Nekje na dolenjskem',
      author: 'Francek Dolgouhec',
      url: 'www.matkurja.si/dolenjska',
      likes: 2,
      id: '6225ff2907a94c03aef78979',
    });
  });
});

describe('mostBlogs', () => {
  test('returns author with most blogs', () => {
    const result = list_helper.mostBlogs(blogs);
    expect(result).toEqual({ author: 'Kita Muhira', blogs: 4 });
  });

  test('if it receives only one blog it returns author with one blog', () => {
    const result = list_helper.mostBlogs(listOfOneBlog);
    expect(result).toEqual({ author: 'Francek Dolgouhec', blogs: 1 });
  });
});

describe('mostLikes', () => {
  test('returns author with most likes', () => {
    const result = list_helper.mostLikes(blogs);
    expect(result).toEqual({ author: 'Kita Muhira', likes: 17 });
  });

  test('if it receives only one blog it returns author with correct likes', () => {
    const result = list_helper.mostLikes(listOfOneBlog);
    expect(result).toEqual({ author: 'Francek Dolgouhec', likes: 2 });
  });
});
