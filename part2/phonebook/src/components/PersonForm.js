import React from 'react';

const PersonForm = ({
  onFormSubmit,
  newName,
  phoneNumber,
  onNameChange,
  onNumberChange,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <label>
        name:{' '}
        <input
          type='text'
          name='newName'
          value={newName}
          onChange={onNameChange}
        />
      </label>
      <br />
      <label>
        number:{' '}
        <input
          type='text'
          name='phoneNumber'
          value={phoneNumber}
          onChange={onNumberChange}
        />
      </label>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
