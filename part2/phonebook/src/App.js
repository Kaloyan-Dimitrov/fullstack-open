import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const Filter = ({ searchString, changeSearchString }) => (
  <>
    filter shown with <input value={searchString} onChange={changeSearchString} />
  </>
)

const PersonForm = ({ newName, newNumber, changeNewName, changeNewNumber, addNewPerson }) => (
    <form>
      <div>
        name: <input value={newName} onChange={changeNewName} /><br/>
        number: <input value={newNumber} onChange={changeNewNumber} />
      </div>
      <div>
        <button type="submit" onClick={addNewPerson}>add</button>
      </div>
    </form>
)

const Persons = ({ persons, deletePerson }) => (
  <>
    {persons.map(person => 
      <div key={person.id}>{person.name} {person.number} <button onClick={deletePerson(person)}>Delete</button></div>
    )}
  </>
)

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [searchString, setSearchString] = useState('')
  
  useEffect(() => {    
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addNewPerson = e => {
    e.preventDefault()
    const sameNumber = persons.find(p => p.number === newNumber)
    const sameName = persons.find(p => p.name === newName)

    if (sameNumber)
      alert(`A person with the number "${newNumber}" is already added to phonebook`)

    else if (sameName) {
      const confirm = window.confirm(`Are you sure you want to update ${newName}`).valueOf()
      if (confirm) {
        const updatePerson = {
          ...sameName,
          number: newNumber
        }
        personsService.update(updatePerson).then(returnedPerson => {
          setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
          setNewName('')
          setNewNumber('')
        })
      }
      else {
        setNewName('')
        setNewNumber('')
      }
    }
      
    else {
      const newId = persons[persons.length - 1].id + 1;
      const newPerson = {
        name: newName,
        number: newNumber,
        id: newId 
      }
      personsService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePerson = person => e => {
    const confirm = window.confirm(`Do you really want to delete ${person.name}`).valueOf()
    if (confirm) {
      personsService.deletePerson(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  const changeNewName = e => setNewName(e.target.value)
  const changeNewNumber = e => setNewNumber(e.target.value)
  const changeSearchString = e => setSearchString(e.target.value)

  const searchResults = persons.filter(p => p.name.toLowerCase().includes(searchString.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchString={searchString} changeSearchString={changeSearchString}></Filter>
      <h1>Add a new</h1>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        changeNewName={changeNewName}
        changeNewNumber={changeNewNumber}
        addNewPerson={addNewPerson}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={searchResults} deletePerson={deletePerson}></Persons>
    </div>
  )
}

export default App