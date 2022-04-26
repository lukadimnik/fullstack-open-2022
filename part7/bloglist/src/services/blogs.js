import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createNewBlog = async (payload) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, payload, config);
  return response.data;
};

const updateBlog = async (payload) => {
  const config = {
    headers: { Authorization: token },
  };
  const url = `${baseUrl}/${payload.id}`;
  const response = await axios.put(url, payload, config);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const url = `${baseUrl}/${blogId}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(url, config);
  return response.status;
};

const createComment = async (blogId, content) => {
  const url = `${baseUrl}/${blogId}/comments`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(url, { content }, config);
  return response.data;
};

export {
  getAll,
  setToken,
  createNewBlog,
  updateBlog,
  deleteBlog,
  createComment,
};
