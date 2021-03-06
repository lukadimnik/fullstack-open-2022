import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { getAll, create, deleteEntry, update } from './personService';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({});

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setphoneNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const notify = (notificationObject) => {
    setNotification(notificationObject);
    setTimeout(() => setNotification({}), 4000);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const doesExist =
      persons.filter((person) => person.name === newName).length > 0;
    if (!doesExist) {
      create({ name: newName, number: phoneNumber })
        .then((res) => {
          setPersons([...persons, { ...res.data }]);
          notify({
            message: `${newName} was added!`,
            type: 'notification',
          });
          setNewName('');
          setphoneNumber('');
        })
        .catch((err) => {
          notify({
            message:
              err.response.data.error ||
              'Failed to create new phonebook entry!',
            type: 'error',
          });
        });
    } else {
      const shouldUpdate = window.confirm(
        `Name: ${newName} already exists in the phonebook. Do you want to update the number?`
      );
      if (shouldUpdate) {
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );
        update(personToUpdate.id, { name: newName, number: phoneNumber })
          .then((res) => {
            const filteredArr = persons.filter(
              (person) => person.id !== personToUpdate.id
            );

            setPersons([
              ...filteredArr,
              { name: newName, number: phoneNumber, id: personToUpdate.id },
            ]);
            notify({
              message: `${newName} was successfully updated!`,
              type: 'notification',
            });
          })
          .catch((err) => {
            console.log(err.response);
            if (err.response.status === 404) {
              notify({
                message: `${newName} has already been deleted from the server!`,
                type: 'error',
              });
            } else {
              notify({
                message:
                  err.response.data.error ||
                  'Failed to update phonebook entry!',
                type: 'error',
              });
            }
          });
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
      {Boolean(Object.keys(notification).length) && (
        <Notification notification={notification} />
      )}
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
