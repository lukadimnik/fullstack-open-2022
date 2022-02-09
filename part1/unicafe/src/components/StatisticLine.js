import React from 'react';

const StatisticLine = ({ name, value, suffix }) => {
  return (
    <tr>
      <td>{name}:</td>
      <td>
        {value}
        {suffix}
      </td>
    </tr>
  );
};

export default StatisticLine;
