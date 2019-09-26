import React, { useState, useEffect } from 'react'
import remote from './services/remote.js'
import './index.css'


const Filter = (props) => {
  return (
      <div>
        filter shown with <input value={props.filterName} onChange={props.filterNameChangeFunc} />
      </div>
    )
}

const PersonForm = (props) => {
  return (
      <form onSubmit={props.buttonSubmitFunc}>
        <div>
          name: <input value={props.newName} onChange={props.nameInputChangeFunc} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.numberInputChangeFunc} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

const Persons = (props) => {
  const personsToDisplay = props.persons.filter(person => (person.name.toLowerCase().indexOf(props.filterName.toLowerCase()) !== -1))
  return personsToDisplay.map(person => (<div key={person.name}>{person.name} {person.number} <button onClick={props.deleteFunction(person.id, person.name)}>delete</button></div>))
}

const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  if (color) {
    return (
      <div className="greenerror">
        {message}
      </div>
  )

  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ messageText, newMessage] = useState(null)
  const [ color, setColor ] = useState(true)

  useEffect(() => {
    remote.getPersons()
    .then((result) => {
      setPersons(result.data)
    })
  },[])

  const sameCheckFunction = (personToCompare) => (person) => (person.name === personToCompare.name) 

  const buttonSubmitFunc = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    let searchPerson = persons.find(sameCheckFunction(newPerson))

    if (searchPerson === undefined) {
      remote.postPerson(newPerson)
      .then((response) => {
        setColor(true)
        newMessage('Added ' + newPerson.name)
        setPersons(persons.concat(response.data))
      })
      setNewName('')
      setNewNumber('')
    } else {
      if (window.confirm(newPerson.name + ' is already added to the phonebook, replace the old number with a new one?')) {
        const newPerson = {...searchPerson, number:newNumber}
        remote.putPerson(searchPerson.id, newPerson)
        .then((response) => {
          setColor(true)
          newMessage('Changed ' + newPerson.name)
          remote.getPersons()
          .then((result) => {
            setPersons(result.data)
          })
        })
        .catch((error) => {
          setColor(false)
          newMessage('Information of ' + newPerson.name + ' has already been removed from server')
        })
      } else {
        window.alert(newName + ' is already added to the phonebook')
      }
    }
  }

  const nameInputChangeFunc = (event) => {
    setNewName(event.target.value)
  }

  const numberInputChangeFunc = (event) => {
    setNewNumber(event.target.value)
  }

  const filterNameChangeFunc = (event) => {
    setFilterName(event.target.value)
  }

  const deleteFunction = (personId, personName) => {
    return () => {
      if (window.confirm('Delete ' + personName + ' ?')) {
        remote.deletePerson(personId)
        .then(() => {
          setColor(false)
          newMessage('Removed ' + personName)
          remote.getPersons()
          .then((result) => {
            setPersons(result.data)
          })
        })
      }
    }
  }

  if (messageText !== null) {
    setTimeout(() => (newMessage(null)), 5000);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={messageText} color={color} />
      <Filter filterName={filterName} filterNameChangeFunc={filterNameChangeFunc} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} nameInputChangeFunc={nameInputChangeFunc} newNumber={newNumber} numberInputChangeFunc={numberInputChangeFunc} buttonSubmitFunc={buttonSubmitFunc} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} deleteFunction={deleteFunction} />
    </div>
  )
}

export default App