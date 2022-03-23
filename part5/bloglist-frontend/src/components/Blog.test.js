import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('it renders component', () => {
  const blog = {
    id: '324adfaf3223',
    user: '341436sdfg',
    likes: 21,
    author: 'Luka Dimnik',
    title: 'Smesko',
    url: 'www.matkurja.si',
  };

  const { queryByText, container } = render(
    <Blog
      blog={blog}
      updateBlogsState={jest.fn()}
      deleteBlogFromState={jest.fn()}
    />
  );

  expect(container.querySelector('.title')).toBeDefined();
  expect(container.querySelector('.author')).toBeDefined();
  expect(container.querySelector('.likes')).toBeNull();
  expect(container.querySelector('.url')).toBeNull();
  expect(container.querySelector('.likes')).toBeNull();
  expect(queryByText('Luka Dimnik')).toBeInTheDocument();
  expect(queryByText('Smesko')).toBeInTheDocument();
  expect(queryByText('www.matkurja.si')).not.toBeInTheDocument();
  expect(queryByText('21')).not.toBeInTheDocument();
});
