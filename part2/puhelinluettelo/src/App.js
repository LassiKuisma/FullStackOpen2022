import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handler }) => {
  return (
    <div>
      Filter: <input
        value={filter}
        onChange={handler}
      />
    </div>
  )
}

const PersonForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addContact }) => {
  return (
    <form onSubmit={addContact}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>number: <input
        value={newNumber}
        onChange={handleNumberChange}
      /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Contacts = ({ contacts }) => {
  return (
    <div>
      {contacts.map(contact =>
        <p key={contact.name}>{contact.name} {contact.number}</p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addContact = (event) => {
    event.preventDefault();

    let alreadyPresent = persons.find(person => person.name === newName) !== undefined;
    if (alreadyPresent) {

      alert(`${newName} is already added to phonebook!`);
      return;
    }


    let personObject = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('0');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const contactsToShow = filter.length === 0
    ? persons
    : persons.filter(
      person => person.name.toLowerCase()
        .includes(filter.toLowerCase())
    );

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(persons.concat(response.data));
      })
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handler={handleFilterChange} />
      <h3>Add new contact</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addContact={addContact}
      />
      <h2>Numbers</h2>
      <Contacts contacts={contactsToShow} />
    </div>
  )
}

export default App
