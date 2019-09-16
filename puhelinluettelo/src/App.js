import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleAddPerson = (event) => { // handler
    event.preventDefault()
    const newPerson = {
      name: newName,
    }
    
    if (persons.map(person => person.name).includes(newName)) {
      return (window.alert(`${newName} has been added already!`))
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleTyping = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value) //target pointtaa <input>in kenttään
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input //input, ja sit sitä händläillään
            value={newName}
            onChange={handleTyping}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person => <li key={person.name} >{person.name}</li> )}
        </ul>
    </div>
  )

}

export default App
