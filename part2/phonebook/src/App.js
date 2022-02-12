import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '72837-899-234' },
  ]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setphoneNumber(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const doesExist =
      persons.filter((person) => person.name === newName).length > 0;
    if (!doesExist) {
      setPersons([...persons, { name: newName, phone: phoneNumber }]);
      setNewName('');
      setphoneNumber('');
    } else {
      window.alert(`Name: ${newName} already exists in the phonebook!`);
    }
  };

  const renderPersons = () => {
    return persons.map((person, i) => (
      <tr key={i}>
        <td>{person.name}</td>
        <td>{person.phone}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      <div>debug: {newName}</div>
      <table>
        <tbody>{renderPersons()}</tbody>
      </table>
    </div>
  );
};

export default App;
