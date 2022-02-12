import { useEffect, useState } from 'react';
import axios from 'axios';
const { REACT_APP_API_KEY } = process.env;

const Weather = ({ displayCountry }) => {
  const [weather, setWeather] = useState({});
  const [fetched, setFetched] = useState(false);
  const icon = Object.keys(weather).length
    ? `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    : '';

  const fetchCountryWeather = async (displayCountry) => {
    const {
      capitalInfo: {
        latlng: [lat, lng],
      },
    } = displayCountry;

    const response = await axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${REACT_APP_API_KEY}`
    );

    setWeather(response.data);
    setFetched(true);
  };

  useEffect(() => {
    fetchCountryWeather(displayCountry);
  }, [displayCountry]);

  return fetched ? (
    <>
      <h2>Weather in {displayCountry.capital[0]}</h2>
      <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
      <p>Weather description: {weather.weather[0].description}</p>
      <img src={icon} alt='weather icon' />
      <p>Wind: {weather.wind.speed}</p>
    </>
  ) : null;
};

export default Weather;
