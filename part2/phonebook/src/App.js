import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import { getAll, create, deleteEntry, update } from './personService';

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
      setPersons([
        ...persons,
        { name: newName, number: phoneNumber, id: persons.length + 1 },
      ]);
      create({ name: newName, number: phoneNumber });
      setNewName('');
      setphoneNumber('');
    } else {
      const shouldUpdate = window.confirm(
        `Name: ${newName} already exists in the phonebook. Do you want to update the number?`
      );
      if (shouldUpdate) {
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );
        update(personToUpdate.id, { name: newName, number: phoneNumber });
        const filteredArr = persons.filter(
          (person) => person.id !== personToUpdate.id
        );

        setPersons([
          ...filteredArr,
          { name: newName, number: phoneNumber, id: personToUpdate.id },
        ]);
        console.log('updatedArr', filteredArr);
      }
    }
  };

  const fetchPersons = async () => {
    const response = await getAll();
    setPersons(response.data);
    console.log('response', response);
  };

  const handleButtonDelete = (id) => {
    deleteEntry(id);
    const newPersonsArr = persons.filter((person) => person.id !== id);
    setPersons([...newPersonsArr]);
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
      <Persons
        filter={filter}
        persons={persons}
        onButtonDelete={handleButtonDelete}
      />
    </div>
  );
};

export default App;
