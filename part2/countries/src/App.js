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
      <div>Capital: {capital}</div>
      <div>Area: {country.area} km²</div>
      <h2>Languages:</h2>
      <ul>{country.languages.map(language => <li key={language}>{language}</li>)}</ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} />
    </div>
  )
}

const CountryList = ({ countries, handleShowCountry }) => {
  return (
    <div>
      {countries.map(country => {
        return (
          <div key={country.name}>
            {country.name}
            <button onClick={() => handleShowCountry(country)}>show</button>
          </div>
        )
      })}
    </div>
  )
}

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

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

          let countryObject = {
            name: countryInfo.name.common,
            area: countryInfo.area,
            capital: countryInfo.capital,
            languages: languages,
            flag: countryInfo.flags['png'],
            location: countryInfo.latlng,
          };

          return countryObject;
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


  let result;

  if (filter.length === 0) {
    result = <div>Type in search term to filter countries.</div>;

  } else if (countriesToShow.length > 10) {
    result = <div>Too many results, please be more specific.</div>;

  } else if (countriesToShow.length === 0) {
    result = <div>No results found.</div>;

  } else if (countriesToShow.length === 1) {
    const country = countriesToShow[0];

    result = <div>
      <SingleCountry country={country} />
    </div>;

  } else {
    result = <CountryList countries={countriesToShow} handleShowCountry={handleShowCountry} />;
  }

  return (
    <div>
      <Filter value={filter} onChangeHandler={handleFilterChange} />
      <h1>Search results</h1>
      {result}
    </div>
  );
}

export default App;
