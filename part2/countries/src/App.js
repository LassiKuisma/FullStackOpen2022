import { useState, useEffect } from 'react'

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

const Countries = ({ countries }) => {
  return (
    <div>
      {countries.map(country => <p key={country.name}>{country.name}</p>)}
    </div>
  )
}

const App = () => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const countries = [
    { name: "finland" },
    { name: "sweden" },
    { name: "usa" },
  ]

  return (
    <div>
      <Filter value={filter} onChangeHandler={handleFilterChange} />
      <h1>Search results</h1>
      <Countries countries={countries} />
    </div>
  );
}

export default App;
