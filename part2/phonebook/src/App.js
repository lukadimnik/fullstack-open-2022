import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
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

  const fetchPersons = async () => {
    const response = await axios('http://localhost:3001/persons');
    setPersons(response.data);
    console.log('response', response);
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <h2>Add a New Entry</h2>
      <PersonForm
        onFormSubmit={handleFormSubmit}
        newName={newName}
        phoneNumber={phoneNumber}
        onNameChange={handleNameChange}
        onNumberChange={handlePhoneNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
    </div>
  );
};

export default App;
