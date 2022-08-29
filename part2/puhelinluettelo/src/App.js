import { useState, useEffect } from 'react'
import contactService from './services/contacts'


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

const Contact = ({ contact }) => {
  return (
    <>
      {contact.name} {contact.number}
    </>
  )
}

const ButtonDeleteContact = ({ deleteContact }) => {
  return (
    <button onClick={deleteContact}>
      Delete
    </button>
  )
}

const Contacts = ({ contacts, deleteContact }) => {
  return (
    <ul>
      {contacts.map(contact =>
        <li key={contact.name}>
          <Contact contact={contact} />
          <ButtonDeleteContact
            id={contact.id}
            name={contact.name}
            deleteContact={() => deleteContact(contact.id, contact.name)}
          />
        </li>
      )}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addContact = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    }

    const oldContact = persons.find(person => person.name === newName)
    const alreadyPresent = oldContact !== undefined
    if (alreadyPresent) {

      const replaceOldNumber = window.confirm(`${newName} is already added to the phonebook, replace old number with new one?`)
      if (!replaceOldNumber) {
        return;
      }

      contactService
        .updateContact(oldContact.id, personObject)
        .then(response => {
          setPersons(persons.map(
            person => person.id !== oldContact.id
              ? person
              : response
          ));
        })


      return;
    }




    contactService
      .createNewContact(personObject)
      .then(newContact => {
        setPersons(persons.concat(newContact));
        setNewName('');
        setNewNumber('0');
      })
  }

  const deleteContact = (id, name) => {
    const confirmation = window.confirm(`Delete ${name}?`)
    if (!confirmation) {
      return;
    }

    contactService
      .deleteContact(id)
      .then(_response => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log(`Failed to delete id=${id}, error message: ${error}`);
        alert(`Failed to delete ${name}`)
      })
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
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(persons.concat(initialContacts));
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
      <Contacts contacts={contactsToShow} deleteContact={deleteContact} />
    </div>
  )
}

export default App
