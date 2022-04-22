import axios from 'axios';
const baseUrl = '/api/users';

export const getAllUsers = async () => {
  try {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
  } catch (error) {
    console.log('Error: ', error);
  }
};
