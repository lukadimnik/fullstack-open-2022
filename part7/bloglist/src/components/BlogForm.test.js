import BlogForm from './BlogForm';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const addNewBlogSpy = jest.fn();

const blogFormProps = {
  showNotification: jest.fn(),
  addNewBlog: addNewBlogSpy,
};

describe('BlogForm', () => {
  test('clicking on the button submit calls the event handler with the right arguments', async () => {
    const { container } = render(<BlogForm {...blogFormProps} />);
    screen.debug();
    const titleInput = container.querySelector('#titleInput');
    const authorInput = container.querySelector('#authorInput');
    const urlInput = container.querySelector('#urlInput');

    expect(titleInput).toBeDefined();
    expect(authorInput).toBeDefined();
    expect(urlInput).toBeDefined();

    userEvent.type(titleInput, 'Avto');
    userEvent.type(authorInput, 'Luka');
    userEvent.type(urlInput, 'www.matkurja.si');

    expect(titleInput).toHaveValue('Avto');
    expect(authorInput).toHaveValue('Luka');
    expect(urlInput).toHaveValue('www.matkurja.si');

    const createButton = container.querySelector('#submit');
    expect(createButton).toBeDefined();
    userEvent.click(createButton);

    expect(addNewBlogSpy).toBeCalledTimes(1);
    expect(addNewBlogSpy.mock.calls).toHaveLength(1);
    expect(addNewBlogSpy.mock.calls[0][0]).toEqual({
      author: 'Luka',
      title: 'Avto',
      url: 'www.matkurja.si',
    });
  });
});
