import React from 'react';

const Total = ({ parts }) => {
  console.log(parts);
  const total = parts.reduce((prev, cur) => prev + cur.exercises, 0);
  return <strong>Total of {total} exercises</strong>;
};

export default Total;
