import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseVote, initializeAnecdotes } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  console.log(anecdotes);
  const filter = useSelector((state) => state.filters);
  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.includes(filter)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const vote = (anecdote) => {
    console.log('vote', anecdote.id);
    dispatch(increaseVote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3));
  };

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
