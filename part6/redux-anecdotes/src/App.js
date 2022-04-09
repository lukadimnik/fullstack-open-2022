import { useSelector, useDispatch } from 'react-redux';
import { increaseVote, addNewAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch(increaseVote(id));
  };

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';
    dispatch(addNewAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='content' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default App;
