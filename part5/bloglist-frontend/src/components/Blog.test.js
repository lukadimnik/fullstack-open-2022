import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

const blog = {
  id: '324adfaf3223',
  user: '341436sdfg',
  likes: 21,
  author: 'Luka Dimnik',
  title: 'Smesko',
  url: 'www.matkurja.si',
};

const blogProps = {
  blog,
  updateBlogsState: jest.fn(),
  deleteBlogFromState: jest.fn(),
};

describe('blog component', () => {
  test('by default renders only title and author', () => {
    const { queryByText, container } = render(<Blog {...blogProps} />);

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

  test('when view button is clicked url and likes are displayed', () => {
    const { queryByText, container } = render(<Blog {...blogProps} />);

    const viewButton = screen.getByText('view');
    expect(viewButton).toBeDefined();
    userEvent.click(viewButton);
    expect(container.querySelector('.title')).toBeDefined();
    expect(container.querySelector('.author')).toBeDefined();
    expect(container.querySelector('.likes')).toBeDefined();
    expect(container.querySelector('.url')).toBeDefined();
    expect(container.querySelector('.likes')).toBeDefined();
    expect(queryByText('Luka Dimnik')).toBeInTheDocument();
    expect(queryByText('Smesko')).toBeInTheDocument();
    expect(queryByText('www.matkurja.si')).toBeInTheDocument();
    expect(queryByText('21')).toBeInTheDocument();
  });
});
