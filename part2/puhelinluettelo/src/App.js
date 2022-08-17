import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <Contacts contacts={persons} />
    </div>
  )
}

export default App
