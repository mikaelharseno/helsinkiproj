import React, { useState } from 'react'
import axios from 'axios'

const Country = (props) => {
  if (props.countrylist.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>)
  } else if (props.countrylist.length === 1) {
    let country = props.countrylist[0]
    let weatherurl = 'http://api.weatherstack.com/current?access_key=8b9616630dfbf9780d235863aca25ced&query=' + country.capital
    axios.get(weatherurl)
    .then((res) => {
      if (res.status === 200 && res.data.success !== false) {
        console.log(res.data.current.temperature)
        console.log(res.data.current.wind_speed)
        props.setTemperature(res.data.current.temperature)
        props.setWind(res.data.current.wind_speed)
        props.setWeatherIcon(res.data.current.weather_icons[0])
      } else {
        props.setTemperature(0)
        props.setWind('No reading currently')
        props.setWeatherIcon('#')
      }
    })
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map((datapoint) => (<li>{datapoint.name}</li>))}
        </ul>
        <img src={country.flag} alt="Flag" />
        <h2>Weather in {country.name}</h2>
        <p>temperature: {props.temperature}</p>
        <img src={props.weathericon} alt="Icon" />
        <p>wind: {props.wind}</p>
      </div>
    )
  }
  
  return (
    <div>
      <ul>
        {props.countrylist.map(country => (<li>{country.name} <button onClick={props.onChangeFunction(country)}>view</button></li>))}
      </ul>
    </div>)
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filterName, setFilterName ] = useState('')
  const [ temperature, setTemperature ] = useState(0)
  const [ wind, setWind ] = useState('')
  const [ weathericon, setWeatherIcon ] = useState('')

  const filterNameChangeFunc = (event) => {
    let newFilterName = event.target.value
    if (newFilterName !== '') {
      axios.get('https://restcountries.eu/rest/v2/name/' + newFilterName)
      .then((res) => {
        if (res.status === 404) {
          setCountries([])
        } else {
          setCountries(res.data)
        }
      })
      .catch((error) => {
        setCountries([])
      })
    } else {
      setCountries([])
    }
    setFilterName(newFilterName)
  }

  const onChangeFunction = (country) => (() => {
    setCountries([country])
    console.log("called")
  })
  

  return (
    <div>
      find countries <input value={filterName} onChange={filterNameChangeFunc} />
      <Country countrylist={countries} onChangeFunction={onChangeFunction} temperature={temperature} wind={wind} setTemperature={setTemperature} setWind={setWind} setWeatherIcon={setWeatherIcon} weathericon={weathericon} />
    </div>
  )
}

export default App