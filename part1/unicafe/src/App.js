import React, { useState } from 'react';
import Statistics from './components/Statistics';
import Button from './components/Button';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name='Good' onClick={() => setGood((prev) => prev + 1)} />
      <Button name='Neutral' onClick={() => setNeutral((prev) => prev + 1)} />
      <Button name='Bad' onClick={() => setBad((prev) => prev + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
