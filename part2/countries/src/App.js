import { useState, useEffect } from 'react';
import axios from 'axios';


const DisplayCountry = ({ country, weather }) => (
  <div>
    <h1>{country.name.common}</h1>
    <div>capital: {country.capital[0]}</div>
    <div>population: {country.population}</div>
    <h2>languages</h2>
    <ul>
    {
      Object.entries(country.languages).map(([id, language]) => 
        <li key={id}>{language}</li>
      )
      }
    </ul>
    <img src={country.flags.svg} height="150" alt={`${country.name.common} flag`}></img>
    {
      weather.current !== undefined
        ? <>
            <h2>Weather in {country.capital[0]}</h2>
            <b>temperature</b>: {weather.current.temperature} Celcius
            <div>
              <img src={weather.current.weather_icons[0]} height="50" alt={`${country.name.common} weather conditioins`}></img>
            </div>
            <b>wind</b>: {weather.current.wind_speed} mpw direction {weather.current.wind_dir}
        </>
        : ''
    }
  </div>
)

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [currentSearch, setCurrentSearch] = useState('')
  const [currentWeather, setCurrentWeather] = useState({})
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => setAllCountries(response.data))
  }, [])

  const changeSearch = e => {
    setCurrentSearch(e.target.value.toLowerCase())
  }

  const setCurrentCountry = countryName => e => {
    setCurrentSearch(countryName.toLowerCase())
  }
  
  const resultCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(currentSearch))

  const currentCountry = resultCountries.length === 1 ? resultCountries[0] : null;

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    if (currentCountry !== null) {
      axios.get(`http://api.weatherstack.com/current?query=${currentCountry.capital[0]}&access_key=${api_key}`).then(response => setCurrentWeather(response.data))
    }
  }, [currentCountry])

  return (
    <div>
      find countries <input value={currentSearch} onChange={changeSearch}></input>
      {currentSearch === ''
        ? <div>Enter a search term.</div>
        : resultCountries.length > 10
          ? <div>Too many matches, specify another filter.</div>
          : resultCountries.map(country =>
            <div key={country.name.common}>
              {country.name.common}
              {currentCountry
                ? ''
                : <button onClick={setCurrentCountry(country.name.common)}>show</button>
              }
            </div>
            ) 
      }
      {currentCountry !== null
        ? <DisplayCountry country={currentCountry} weather={currentWeather}></DisplayCountry>
        : ''
      }
    </div>
  );
}

export default App;
