import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PhonebookList = ({persons, filter}) => {
  const filteredNames = persons
  const filt = filter

  if (filter !== "") { //filteriin taitaa mennä jtn ennen kuin kaatuu, koska pääsee 7:aan
    const filteredNames = persons.filter(person => (person.name.includes(filt)))
    return (
      <ul>
          {filteredNames.map(person => <li key={person.name} >{person.name} {person.number}</li> )}
      </ul>
    )
  }
  //Jos ei haluta filtteröidä = näytä kaikki.
  else { 
    return (
      <ul>
        {filteredNames.map(person => <li key={person.name} >{person.name} {person.number}</li> )}
      </ul>
      )
  }
}

const Filtering = ({filter, setFilter}) => {

  const handleTypingFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
  <div>

        show contacts with:  
          <input
            name="filter"
            value={filter}
            onChange={handleTypingFilter}
          />
  </div>
  )
}

const PersonForm = ({newName, newNumber, handleTypingName, handleTypingNumber, handleAddPerson}) => {
  return (
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
  )
} 

const App = () => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ persons, setPersons ] = useState(
    [
      { name: 'Arto Hellas',
        number: '+358 60 546 2345'
      },
      { name: 'Liisa Lokki',
        number: '+47 67 345 7654'
      },
      { name: 'Kaisa Kuoriainen',
        number: '+358 12 101 0010'
      },
      { name: 'Kaj Frank',
        number: '+45 45 5300 355'
      },
      { name: 'Päivi Päärynäjäätelö',
        number: '+1 405 054 7722'
      }
    ]
  ) 

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('response.data', response.data)
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleAddPerson = (event) => { // handler
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    
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

  return (
    <div>
      <h2>Phonebook</h2>
        <Filtering filter={filter} setFilter={(e) => setFilter(e)}/>
      <h2>Add a New Contact</h2>
        <PersonForm newName={newName} newNumber={newNumber} handleTypingName={handleTypingName} handleTypingNumber={handleTypingNumber} handleAddPerson={handleAddPerson} />
      <h2>Numbers</h2>
        <PhonebookList persons={persons} filter={filter} />
    </div>
  )

}


export default App
