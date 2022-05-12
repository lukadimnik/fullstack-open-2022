import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../Queries';

const BirthYearForm = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const updateBirthyer = (event) => {
    event.preventDefault();
    console.log('Updating birth year');

    updateAuthor({
      variables: { name, setBornTo: parseInt(born) },
    });

    setName('');
    setBorn('');
  };
  return (
    <form onSubmit={updateBirthyer}>
      <h3>Set birthyear</h3>
      <label>
        Name:{' '}
        <input
          type='text'
          name='name'
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </label>
      <br />
      <label>
        Born:{' '}
        <input
          type='number'
          name='born'
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
      </label>
      <br />
      <button type='submit'>update author</button>
    </form>
  );
};

export default BirthYearForm;
