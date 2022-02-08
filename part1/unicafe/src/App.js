import React, { useState } from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = (1 * good + 0 * neutral + -1 * bad) / total;
  const positivePercentage = (good * 100) / total;

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood((prev) => prev + 1)}>Good</button>
      <button onClick={() => setNeutral((prev) => prev + 1)}>Neutral</button>
      <button onClick={() => setBad((prev) => prev + 1)}>Bad</button>

      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {total}</p>
      <p>Average: {average.toFixed(2)}</p>
      <p>Positive: {positivePercentage.toFixed(2)}%</p>
    </div>
  );
};

export default App;
