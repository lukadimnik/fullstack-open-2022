import { createSlice } from '@reduxjs/toolkit';
import { createNewAnecdote, getAllAnecdotes, vote } from '../anecdoteService';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increaseVoteInState(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    addNewAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const {
  increaseVoteInState,
  addNewAnecdote,
  setAnecdotes,
  appendAnecdote,
} = anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAllAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createNewAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const increaseVote = (anecdote) => {
  return async (dispatch) => {
    await vote({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch(increaseVoteInState(anecdote.id));
  };
};

export default anecdotesSlice.reducer;
