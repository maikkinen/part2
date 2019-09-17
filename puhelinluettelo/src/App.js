import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState(
    [
      { name: 'Arto Hellas',
        phonenumber: '+358 60 546 2345'
      },
      {
        name: 'Liisa Lokki',
        phonenumber: '+47 67 345 7654'
      },
      { name: 'Kaisa Kuoriainen',
        phonenumber: '+358 12 101 0010'
      },
      { name: 'Kaj Frank',
        phonenumber: '+45 45 5300 355'
      }
    ]
  ) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filteringPattern, filterWith ] = useState('')

  const handleAddPerson = (event) => { // handler
    event.preventDefault()
    const newPerson = {
      name: newName,
      phonenumber: newNumber
    }
    
    //TODO: vaadi, ettei oo tyhjä. Typerää, että voi lisätä ' ' -nimisen tyypin. -- OK :)
    
    if (persons.map(person => person.name).includes(newName)) {
      return (window.alert(`${newName} has been added already!`))
    }
    else if (newNumber.length <= 0) {
      return (window.alert(`Please, give ${newName} an appropriate phone number!`))
    }
    else {
      const personsUpd = persons.concat(newPerson)
      setPersons(personsUpd)
      setNewName('')
      setNewNumber('')
    }
    
  }

  const handleTypingName = (event) => (setNewName(event.target.value))
  
  const handleTypingNumber = (event) => (setNewNumber(event.target.value))

  const handleTypingFilter = (event) => {
    console.log(event.target.value)
    filterWith(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        show contacts with:  
          <input
            name="filteringPattern"
            value={filteringPattern}
            onChange={handleTypingFilter}
          />
      </div>
      <h2>Add a New Contact</h2>
      <form style={{margin: 10}} onSubmit={handleAddPerson}>
        <div>
          name: <input //input, ja sit sitä händläillään
            name="name"
            value={newName}
            onChange={handleTypingName}/>
        </div>
        <div>
          number: <input
            name="number" 
            value={newNumber}
            onChange={handleTypingNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person => <li key={person.name} >{person.name} {person.phonenumber}</li> )}
        </ul>
    </div>
  )

}

export default App
