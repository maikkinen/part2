import React, { useState, useEffect } from 'react'
import puhelinluetteloService from './services/puhelinluettelo'

const PhonebookList = ({persons, filter, handleDelete}) => {
  const filteredNames = persons
  const filt = filter

  if (filter !== "") { //filteriin taitaa mennä jtn ennen kuin kaatuu, koska pääsee 7:aan
    const filteredNames = persons.filter(person => (person.name.includes(filt)))
    return (
      <ul>
        {filteredNames.map(person => <li key={person.id} >{person.name} {person.number} <button onClick={ (e) => handleDelete(person.id, e)}> delete </button> </li> )}
      </ul>
    )
  }
  //Jos ei haluta filtteröidä = näytä kaikki.
  else { 
    return (
      <ul>
        {filteredNames.map(person => 
        <li key={person.id} >{person.name} {person.number} 
          <button onClick={ (e) => handleDelete(person.id, e)}> delete </button> 
        </li> )}
      </ul>
      )
  }
}

const Filtering = ({filter, setFilter}) => {

  const handleTypingFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
  <div>

        show contacts with:  
          <input className='inputField'
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
        name: <input className='inputField' //input, ja sit sitä händläillään
          name="name"
          value={newName}
          onChange={handleTypingName}/>
      </div>
      <div>
        number: <input className='inputField'
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

const Notification = ({ message }) => {
  if (message == null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ persons, setPersons ] = useState( [] )
  const [ errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    puhelinluetteloService
      //.get('http://localhost:3001/persons')
      .getAll()
      .then(response => {
        console.log(response)
        setPersons(response)
      })
  }, [])

  // tee uus handleDelete
  // src/servicesiin pitää tehdä http update
  // syötä tää setti button onClickille 



  const handleDelete = (id, event) => {
    const answer = window.confirm("You sure u wanna do this?")
    if (answer) {
      console.log("farewell firewall honey", id)
      event.preventDefault(event)
      puhelinluetteloService
      .deletePerson(id)
      .then(response => {
        setErrorMessage(
          `That dude was deleted.`
        )
        console.log("reesponse", response)
        console.log("errorMessage", errorMessage)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        
        setPersons(persons.filter(person => person.id !== id))
      
      })
      .catch(error => {
        setErrorMessage(
         `(S)he was already removed from the server`  //'${response.name}'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }
  }

  const handleAddPerson = (event) => { // handler
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    
    // tää tyyppi on jo olemassa for sure, eli nyt sit vaa päivitä nro
    // if on olemassa update, else add

    if (persons.map(person => person.name).includes(newName)) {
      const updateThisPerson = persons.find(x => x.name === newName)
      console.log("updated Person", newPerson)
      const answer = window.confirm(`${newName} exists already. Would you like to update the number?`)
        if (answer) {
          puhelinluetteloService
            .update(updateThisPerson.id, newPerson)
            .then( updatedPerson => {
              setErrorMessage(
                `Contact details of '${newName}' have been updated.` //'${response.name}'
              )
              console.log("hey")
              setTimeout(() => {
                setErrorMessage(null)
              }, 3000)
              setPersons(persons.map(person => person.name !== newName ? person : updatedPerson))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setErrorMessage(
                `Failed to update contact details.`
              )
            })
        }
      return (
        console.log("sup")
        )
    }
    else if (newNumber.length <= 1) {
      return (window.alert(`Please, give ${newName} an appropriate phone number!`))
    }
    else {
      puhelinluetteloService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setErrorMessage(
            `'${response.name}' has been added.`
          )
          console.log("response", response)
          console.log("errorMessage", errorMessage)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    
  }
}

  const handleTypingName = (event) => (setNewName(event.target.value))
  const handleTypingNumber = (event) => (setNewNumber(event.target.value))

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={errorMessage} />
        <Filtering filter={filter} setFilter={(e) => setFilter(e)}/>
      <h2>Add a New Contact</h2>
        <PersonForm newName={newName} newNumber={newNumber} handleTypingName={handleTypingName} handleTypingNumber={handleTypingNumber} handleAddPerson={handleAddPerson} />
      <h2>Numbers</h2>
        <PhonebookList persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )

}

export default App
