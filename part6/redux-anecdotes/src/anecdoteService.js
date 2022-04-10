import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createNewAnecdote = async (content) => {
  const payload = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, payload);
  return response.data;
};

export const vote = async (payload) => {
  const response = await axios.put(`${baseUrl}/${payload.id}`, payload);
  return response.data;
};

export const getAnecdoteById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};
