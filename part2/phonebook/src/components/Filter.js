import React from 'react';

const Filter = ({ filter, onFilterChange }) => {
  return (
    <label>
      Filter shown with{' '}
      <input
        type='text'
        name='filter'
        value={filter}
        onChange={onFilterChange}
      />
    </label>
  );
};

export default Filter;
