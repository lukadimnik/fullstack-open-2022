import axios from 'axios';
import { useEffect, useState } from 'react';
import './app.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  const fetchCountries = async () => {
    const response = await axios('https://restcountries.com/v3.1/all');
    console.log('response', response);
    setCountries(response.data);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const renderCountries = () => {
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
    console.log(filteredCountries);

    if (filteredCountries.length === 1) {
      const displayCountry = filteredCountries[0];
      return (
        <div>
          <h1>{displayCountry.name.common}</h1>
          <p>Capital: {displayCountry.capital[0]}</p>
          <p>Area: {displayCountry.area}</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(displayCountry.languages).map((lang, i) => (
              <li key={i}>{lang}</li>
            ))}
          </ul>
          <img
            className='flag'
            src={displayCountry.flags.png}
            alt='country flag'
          />
        </div>
      );
    } else if (filteredCountries.length < 10) {
      return (
        <ul>
          {filteredCountries.map((country, i) => (
            <li key={i}>{country.name.common}</li>
          ))}
        </ul>
      );
    }
    return <p>Too many matches, specify another filter</p>;
  };

  return (
    <div className='App'>
      <label>
        Search:{' '}
        <input type='text' value={search} onChange={handleSearchChange} />
      </label>
      {renderCountries()}
    </div>
  );
}

export default App;
