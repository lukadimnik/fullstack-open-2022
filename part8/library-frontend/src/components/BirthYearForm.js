import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../Queries';
import Select from 'react-select';


const BirthYearForm = ({authors}) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState('');

  const options = authors.map(author => {
    return {
      value: author.name,
      label: author.name
    }
  })

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const updateBirthyer = (event) => {
    event.preventDefault();
    console.log('Updating birth year', name, born);

    updateAuthor({
      variables: { name, setBornTo: parseInt(born) },
    });

    setName('');
    setBorn('');
  };
  return (
    <form onSubmit={updateBirthyer}>
      <h3>Set birthyear</h3>
      <Select
        defaultValue={name}
        onChange={(nameObject) => setName(nameObject.value)}
        options={options}
      />
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