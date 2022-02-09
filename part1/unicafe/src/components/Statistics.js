import React from 'react';

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (1 * good + 0 * neutral + -1 * bad) / total;
  const positivePercentage = (good * 100) / total;
  const feedbackGiven = good > 0 || neutral > 0 || bad > 0;

  return (
    <>
      <h1>Statistics</h1>

      {feedbackGiven ? (
        <>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <p>Total: {total}</p>
          <p>Average: {average.toFixed(2)}</p>
          <p>Positive: {positivePercentage.toFixed(2)}%</p>
        </>
      ) : (
        <p>No feedback given!</p>
      )}
    </>
  );
};

export default Statistics;
