import React from 'react';

const Persons = ({ persons, filter, onButtonDelete }) => {
  const renderPersons = () => {
    return persons
      .filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
      .map((person, i) => (
        <tr key={person.id}>
          <td>{person.name}</td>
          <td>{person.number}</td>
          <td>
            <button onClick={() => onButtonDelete(person.id)}>Delete</button>
          </td>
        </tr>
      ));
  };

  return (
    <table>
      <tbody>{renderPersons()}</tbody>
    </table>
  );
};

export default Persons;
