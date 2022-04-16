import axios from 'axios';
const baseUrl = '/api/login';

const login = async (username, password) => {
  try {
    const request = await axios.post(baseUrl, {
      username,
      password,
    });
    const response = request.data;
    return response;
  } catch (error) {
    console.log('error', error);
  }
};

export default login;
