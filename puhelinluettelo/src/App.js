import React, { useState } from 'react'

//Anna tyypille puhelinnumero!

const PuhelinnumeronLisays = ({newName}, {setNewName}, persons, setPersons) => {
  
  const handleAddPerson = (event) => { // handler
    event.preventDefault()
    const newPerson = {
      name: newName,
    }
    
    // Kaatuu ehkä siihen, että yrittää formilla submit 'ei mitään?' Pitäiskö require, että ei ole tyhjä?
    if (persons.map(person => person.name).includes(newName)) {
      return (window.alert(`${newName} has been added already!`))
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleTyping = (event) => {
    console.log("here", event.target.value)
    setNewName(event.target.value) //target pointtaa <input>in kenttään
  }

  return (
    <div>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input //input, ja sit sitä händläillään
            value={newName}
            onChange={handleTyping}
            />
        </div>
        {console.log("sup")}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )

}


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <PuhelinnumeronLisays newName={newName} setNewName={setNewName} persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person => <li key={person.name} >{person.name}</li> )}
        </ul>
    </div>
  )

}

export default App
