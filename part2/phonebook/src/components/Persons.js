import React from 'react';

const Persons = ({ persons, filter }) => {
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
    <table>
      <tbody>{renderPersons()}</tbody>
    </table>
  );
};

export default Persons;
