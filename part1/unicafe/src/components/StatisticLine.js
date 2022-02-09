import React from 'react';

const StatisticLine = ({ name, value, suffix }) => {
  return (
    <p>
      {name}: {value}
      {suffix}
    </p>
  );
};

export default StatisticLine;
