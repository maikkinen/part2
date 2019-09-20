import React, {useState, useEffect} from 'react';
import axios from 'axios'

const CountryList = ({countries, filter}) => {
  const filteredCountries = countries
  const filt = filter

  if (filter !== "") {
    const filteredCountries = countries.filter(country => (country.name.includes(filt)))
    if(filteredCountries.length >= 7) {
      return (
        <div>
          Too many matches, be more specific, please.
        </div>
      )
    }
    else {
      return (
        <ul>
            {filteredCountries.map(country => <li key={country.name} >{country.name}</li> )}
        </ul>
      )
    }
  }
  // Default, kun ei oo vielä tullut ensimmäistäkään inputtia filteriin.
  else { 
    return (
      <p> Too many matches, be more specific, please. </p>
      )
  }
}

const displayMany = ({filteredCountries}) => {
  return(
    <div>
      Yo many
    </div>
  )
}

const displayOne = ({oneCountry}) => {
  return(
    <div>
      Yo One
    </div>
  )
}

const FilteringField = ({filter, setFilter}) => {

  const handleTypingFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
  <div>
        Find countries   
          <input
            name="filter"
            value={filter}
            onChange={handleTypingFilter}
          />
  </div>
  )
}


const App = () => {
  const [ filter, setFilter] = useState('')
  const [ displayCountry, setDisplayCountry] = useState('')
  const [ countries, setCountries ] = useState ( //incl. 12 hard-coded samples
    [
      {
        name: "Sweden",
        capital: "Stockholm",
        population: "8,7 million",
        languages: 'Swedish'
      },
      {
        name: "Norway",
        capital: "Oslo",
        population: "6,7 million",
        languages: 'Norwegian'
      },
      {
        name: "Iceland",
        capital: "Reykjavik",
        population: "3,2 million",
        languages: 'Icelandic'
      },
      {
        name: "France",
        capital: "Paris",
        population: "50 million",
        languages: 'French'
      },
      {
        name: "Turku",
        capital: "Paris",
        population: "50 million",
        languages: 'French'
      },
      {
        name: "Kokkola",
        capital: "Paris",
        population: "50 million",
        languages: 'French'
      },
      {
        name: "Rovaniemi",
        capital: "Paris",
        population: "50 million",
        languages: 'French'
      },
      {
        name: "Tampere",
        capital: "Paris",
        population: "50 million",
        languages: 'French'
      },
      {
        name: "Kuopio",
        capital: "Paris",
        population: "50 million",
        languages: 'French'
      },
      {
        name: "Vaasa",
        capital: "Paris",
        population: "50 million",
        languages: 'French'
      },
      {
        name: "Ekenäs",
        capital: "Umeå",
        population: "50 million",
        languages: 'Finlandssvenska'
      },
      {
        name: "Kotka",
        capital: "Paris",
        population: "50 million",
        languages: 'French'
      }
    ]
  )

  return (
    <div>
      <h3>Welcome</h3>
      <FilteringField filter={filter} setFilter={(e) => setFilter(e)}/>
      <br>
      </br>
      <h3>Matching</h3>
      <CountryList countries={countries} filter={filter}/>
    </div>
  )
}

export default App
