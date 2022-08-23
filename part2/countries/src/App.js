import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChangeHandler }) => {
  return (
    <div>
      Search countries:
      <input
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  )
}

const CountryDetails = ({ country }) => {
  let capital = "Unknown";
  if (country.capital !== undefined) {
    capital = country.capital.join(', ')
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {capital}</div>
      <div>Area: {country.area} km²</div>
      <h2>Languages:</h2>
      <ul>{country.languages.map(language => <li key={language}>{language}</li>)}</ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} />
    </div>
  )
}

const CountryList = ({ countries, onShowCountry }) => {
  return (
    <div>
      {countries.map(country =>
        <div key={country.name}>
          {country.name}
          <button onClick={() => onShowCountry(country)}>show</button>
        </div>
      )}
    </div>
  )
}

const Countries = ({
  countries,
  filterIsEmpty,
  onShowCountry,
  weather,
  setWeather
}) => {

  if (filterIsEmpty) {
    return <div>Type in search term to filter countries.</div>;
  }

  if (countries.length > 10) {
    return <div>Too many results, please be more specific.</div>;
  }

  if (countries.length === 0) {
    return <div>No results found.</div>;
  }

  if (countries.length === 1) {
    const country = countries[0];

    return (
      <div>
        <CountryDetails country={country} />
        <h2>Weather in {country.name}</h2>
        <button
          onClick={() => {
            GetWeatherData(country.location, setWeather)
          }}>
          Click here to fetch weather data.
        </button>
        <Weather weather={weather} />
      </div>
    );

  } else {
    return (
      <CountryList
        countries={countries}
        onShowCountry={onShowCountry}
      />
    );
  }
}

const Weather = ({ weather }) => {
  if (weather === undefined) {
    return (
      <div>
        No weather data available.
      </div>
    )
  }

  return (
    <div>
      <div>Temperature: {weather.temperature} Celcius</div>
      <img
        src={`http://openweathermap.org/img/wn/${weather.cloudIcon}@2x.png`}
        alt={`${weather.cloudDescription}`}>
      </img>
      <div>Wind: {weather.windSpeed} m/s</div>
    </div>
  )
}

const GetWeatherData = (location, setWeather) => {
  console.log('Getting weather data...');

  const apiKey = process.env.REACT_APP_API_KEY;

  if (apiKey === undefined) {
    console.log("Can't find api key.");
    return;
  }

  const lat = location[0];
  const lon = location[1];
  const units = "metric";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios
    .get(apiUrl)
    .then(response => {
      if (response.status !== 200) {
        console.log('Failed to get weather');
        setWeather(undefined);
      }

      console.log('Got weather response!');


      const weatherObject = {
        temperature: response.data.main.temp,
        windSpeed: response.data.wind.speed,
        cloudIcon: response.data.weather[0].icon,
        cloudDescription: response.data.weather[0].description,
      }

      setWeather(weatherObject);
    })
}

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(undefined);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleShowCountry = (country) => {
    setFilter(country.name);
  }

  // load country data
  useEffect(() => {
    console.log('Fetching country data');

    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('Country data fetched');

        const countriesList = response.data.map(countryInfo => {

          const languages = countryInfo.languages === undefined
            ? []
            : Object.values(countryInfo.languages);

          return {
            name: countryInfo.name.common,
            area: countryInfo.area,
            capital: countryInfo.capital,
            languages: languages,
            flag: countryInfo.flags['png'],
            location: countryInfo.latlng,
          };
        });

        setCountries(countriesList);
      })
  }, []);


  const countriesToShow = countries
    .filter(country => {
      let nameLower = country.name.toLowerCase();
      let filterLower = filter.toLowerCase();

      return nameLower.startsWith(filterLower);
    });


  return (
    <div>
      <Filter value={filter} onChangeHandler={handleFilterChange} />
      <h1>Search results</h1>
      <Countries
        countries={countriesToShow}
        filterIsEmpty={filter.length === 0}
        onShowCountry={handleShowCountry}
        weather={weather}
        setWeather={setWeather}
      />
    </div>
  );
}

export default App;
