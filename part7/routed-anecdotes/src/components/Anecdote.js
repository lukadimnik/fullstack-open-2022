import React from 'react';
import { useParams } from 'react-router-dom';

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((anecdote) => anecdote.id === parseInt(id));

  return (
    <>
      <h2>{anecdote.content}</h2>
      <p>Has {anecdote.votes} votes</p>
    </>
  );
};

export default Anecdote;
