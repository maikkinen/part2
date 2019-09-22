import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountryList = ({countries, filter, setFilter}) => {
  const filt = filter

  if (filter !== "") {
    const filteredCountries = countries.filter(country => (country.name.includes(filt)))
    if(filteredCountries.length >= 10) {
      return (
        <div>
          Too many matches, be more specific, please.
        </div>
      )
    }
    else if(filteredCountries.length > 1) {
      return (
        <div>
          <DisplayMany filteredCountries={filteredCountries} setFilter={setFilter}/>
          {console.log('here babe')}
        </div>
      )
    }
    else if(filteredCountries.length === 0) {
      return (
        <div>
          I'm afraid there ain't such a place on the planet.
          {/* {console.log('here babe')}*/}
        </div>
      )
    }
    else {
      return (
        <div>
        <DisplayOne filteredCountries={filteredCountries}/>
        {console.log('ready to call DisplayOne, honey, with', filteredCountries)}
        </div>
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

const DisplayMany = ({filteredCountries, setFilter}) => {

  return(
    <div>
    <ul>
      {filteredCountries.map(country => 
        <li key={country.name}>
          {country.name} <button onClick={() => setFilter(country.name)}> show</button> </li> 
        )}
    </ul>
    </div>
  )
}

const DisplayOne = ({filteredCountries}) => {
  const country = filteredCountries[0]
  const languages=country.languages
  return(
    <div>
      <h4>{country.name}</h4>
      <p style={{margin:0}}>capital: {country.capital}</p>
      <p style={{margin:0}}>population: {country.population}</p>
      <h4>Languages</h4>
        <ul>
          {languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
        </ul>
      <img src={country.flag} key={country.name} style={{width:110, height:75}}/>
    </div>
  )
}

const FilteringField = ({filter, setFilter}) => {
  const handleTypingFilter = (event) => {
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
  const [ countries, setCountries ] = useState ([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('response.data', response.data)
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <h3>Welcome</h3>
      <FilteringField filter={filter} setFilter={(e) => setFilter(e)}/>
      <h3>Matching</h3>
      {console.log(filter)}
      <CountryList countries={countries} filter={filter} setFilter={(e) => setFilter(e)}/>
    </div>
  )
}

export default App



/**
 *       {
        name: "Sweden",
        capital: "Stockholm",
        population: "8,7 million",
        languages: ['French', 'Chinese', 'Polish', 'Norwegian']
      },
      {
        name: "Norway",
        capital: "Oslo",
        population: "6,7 million",
        languages: ['French', 'Chinese', 'Polish', 'Norwegian']
      },
      {
        name: "Iceland",
        capital: "Reykjavik",
        population: "3,2 million",
        languages: ['French', 'Chinese', 'Polish', 'Norwegian']
      },
      {
        name: "France",
        capital: "Paris",
        population: "50 million",
        languages: ['French', 'Chinese', 'Polish', 'Norwegian']
      },
      {
        name: "Turku",
        capital: "Paris",
        population: "50 million",
        languages: ['French', 'Chinese', 'Polish', 'Norwegian']
      },
      {
        name: "Kokkola",
        capital: "Paris",
        population: "50 million",
        languages: ['French', 'Chinese', 'Polish', 'Norwegian']
      },
      {
        name: "Rovaniemi",
        capital: "Paris",
        population: "50 million",
        languages: ['French', 'Chinese', 'Polish', 'Norwegian']
      },
      {
        name: "Tampere",
        capital: "Paris",
        population: "50 million",
        languages: ['French', 'Chinese', 'Polish', 'Norwegian']
      },
      {
        name: "Kuopio",
        capital: "Paris",
        population: "50 million",
        languages: ['Japanese', 'Chinese', 'Polish', 'Norwegian']
      },
      {
        name: "Vaasa",
        capital: "Paris",
        population: "50 million",
        languages: ['Swedish']
      },
      {
        name: "Ekenäs",
        capital: "Umeå",
        population: "50 million",
        languages: ['Finlandssvenska', 'rikssvenska']
      },
      {
        name: "Kotka",
        capital: "Madrid",
        population: "50 million",
        languages: ['Persian']
      }
 */