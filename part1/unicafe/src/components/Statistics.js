import React from 'react';
import StatisticLine from './StatisticLine';

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (1 * good + 0 * neutral + -1 * bad) / total;
  const positivePercentage = (good * 100) / total;
  const feedbackGiven = good > 0 || neutral > 0 || bad > 0;

  return (
    <>
      <h1>Statistics</h1>

      {feedbackGiven ? (
        <table>
          <tbody>
            <StatisticLine name='Good' value={good} />
            <StatisticLine name='Neutral' value={neutral} />
            <StatisticLine name='Bad' value={bad} />
            <StatisticLine name='Total' value={total} />
            <StatisticLine name='Average' value={average.toFixed(2)} />
            <StatisticLine
              name='Positive'
              value={positivePercentage.toFixed(2)}
              suffix={'%'}
            />
          </tbody>
        </table>
      ) : (
        <p>No feedback given!</p>
      )}
    </>
  );
};

export default Statistics;
