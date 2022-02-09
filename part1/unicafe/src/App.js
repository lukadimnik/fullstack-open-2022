import React, { useState } from 'react';
import Statistics from './components/Statistics';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood((prev) => prev + 1)}>Good</button>
      <button onClick={() => setNeutral((prev) => prev + 1)}>Neutral</button>
      <button onClick={() => setBad((prev) => prev + 1)}>Bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
