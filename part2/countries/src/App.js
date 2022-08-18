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

const SingleCountry = ({ country }) => {
  let capital = "Unknown";
  if (country.capital !== undefined) {
    capital = country.capital.join(', ')
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        Capital: {capital}
      </div>
      <div>
        Area: {country.area} km²
      </div>
      <h2>
        Languages:
      </h2>
      <ul>
        {country.languages.map(language => <li key={language}>{language}</li>)}
      </ul>
    </div>
  )
}

const Countries = ({ allCountries, filterTerm }) => {
  if (filterTerm.length === 0) {
    return (
      <div>No search term given.</div>
    )
  }

  const countriesToShow = allCountries
    .filter(country => {
      let nameLower = country.name.toLowerCase();
      let filterLower = filterTerm.toLowerCase();

      return nameLower.startsWith(filterLower);
    });

  if (countriesToShow.length > 10) {
    return (
      <div>Too many matches, please be more specific.</div>
    )
  }

  if (countriesToShow.length === 1) {
    return (
      <SingleCountry country={countriesToShow[0]} />
    )
  }

  return (
    <div>
      {countriesToShow.map(country => <div key={country.name}>{country.name}</div>)}
    </div>
  )
}

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {

        let countriesList = Array(response.data.length);

        response.data.forEach(countryInfo => {

          let languages = [];

          if (countryInfo.languages !== undefined) {
            languages = Object.values(countryInfo.languages);
          }

          let countryObject = {
            name: countryInfo.name.common,
            area: countryInfo.area,
            capital: countryInfo.capital,
            languages: languages,
          };
          countriesList.push(countryObject);
        });

        setCountries(countriesList);
      })
  }, []);


  return (
    <div>
      <Filter value={filter} onChangeHandler={handleFilterChange} />
      <h1>Search results</h1>
      <Countries allCountries={countries} filterTerm={filter} />
    </div>
  );
}

export default App;
