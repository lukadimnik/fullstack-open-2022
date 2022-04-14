import axios from 'axios';

export const getCountry = async (countryName) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
