import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const doesExist =
      persons.filter((person) => person.name === newName).length > 0;
    if (!doesExist) {
      setPersons([...persons, { name: newName }]);
      setNewName('');
    } else {
      window.alert(`Name: ${newName} already exists in the phonebook!`);
    }
  };

  const renderPersons = () => {
    return persons.map((person, i) => <li key={i}>{person.name}</li>);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name:{' '}
          <input
            type='text'
            name='newName'
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>debug: {newName}</div>
      {renderPersons()}
    </div>
  );
};

export default App;
