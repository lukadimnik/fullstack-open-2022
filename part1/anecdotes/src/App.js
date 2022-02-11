import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [votesArr, setVotesArr] = useState(new Array(anecdotes.length).fill(0));
  console.log(votesArr);

  const randomQuoteSelector = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNum);
  };

  const vote = () => {
    const copyArr = [...votesArr];
    copyArr[selected] += 1;
    setVotesArr(copyArr);
  };

  const mostVotes = () => {
    const maxVotes = Math.max(...votesArr);
    return anecdotes[votesArr.indexOf(maxVotes)];
  };

  return (
    <div>
      {anecdotes[selected]}
      <br />
      <p>Has {votesArr[selected]} number of votes</p>
      <button onClick={randomQuoteSelector}>Next Quote</button>
      <button onClick={vote}>Vote</button>
      <br />
      {votesArr.reduce((prev, cur) => prev + cur) ? <p>{mostVotes()}</p> : null}
    </div>
  );
};

export default App;