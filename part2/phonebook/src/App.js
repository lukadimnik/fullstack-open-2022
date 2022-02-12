import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setphoneNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const doesExist =
      persons.filter((person) => person.name === newName).length > 0;
    if (!doesExist) {
      setPersons([...persons, { name: newName, number: phoneNumber }]);
      setNewName('');
      setphoneNumber('');
    } else {
      window.alert(`Name: ${newName} already exists in the phonebook!`);
    }
  };

  const renderPersons = () => {
    return persons
      .filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
      .map((person, i) => (
        <tr key={i}>
          <td>{person.name}</td>
          <td>{person.number}</td>
        </tr>
      ));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <label>
        Filter shown with{' '}
        <input
          type='text'
          name='filter'
          value={filter}
          onChange={handleFilterChange}
        />
      </label>
      <h2>Add a New Entry</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          name:{' '}
          <input
            type='text'
            name='newName'
            value={newName}
            onChange={handleNameChange}
          />
        </label>
        <br />
        <label>
          number:{' '}
          <input
            type='text'
            name='phoneNumber'
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </label>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>{renderPersons()}</tbody>
      </table>
    </div>
  );
};

export default App;
