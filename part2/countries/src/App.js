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

const Countries = ({ countries, filterIsEmpty, onShowCountry }) => {

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
      />
    </div>
  );
}

export default App;
