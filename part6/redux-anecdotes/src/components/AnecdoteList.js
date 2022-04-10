import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAnecdotes } from '../anecdoteService';
import { increaseVote, setAnecdotes } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  console.log(anecdotes);
  const filter = useSelector((state) => state.filters);
  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.includes(filter)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getAllAnecdotes().then((data) => {
      console.log(data);
      return dispatch(setAnecdotes(data));
    });
  }, [dispatch]);

  const vote = (id) => {
    console.log('vote', id);
    dispatch(increaseVote(id));
  };

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
