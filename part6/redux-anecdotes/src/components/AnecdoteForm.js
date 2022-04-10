import { useDispatch } from 'react-redux';
import { createNewAnecdote } from '../anecdoteService';
import { addNewAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = '';
    const savedAnecdote = await createNewAnecdote(content);
    dispatch(addNewAnecdote(savedAnecdote));
    dispatch(setNotification(savedAnecdote.content));

    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='content' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
