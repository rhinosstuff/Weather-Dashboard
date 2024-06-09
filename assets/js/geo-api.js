let SAVED_CITIES = JSON.parse(localStorage.getItem('savedCities')) || []
let CURRENT_CITY = JSON.parse(localStorage.getItem('currentCity'))
let CURRENT_STATE = JSON.parse(localStorage.getItem('currentState'))
let CURRENT_COUNTRY = JSON.parse(localStorage.getItem('currentCountry'))

// Searches OpenWeather Geocoder API based on 'City Name, State, Country'
function findCity(cityQuery, stateQuery, countryQuery) {
  const limit =  1
  const apiKey = '0f0384b7e7c02ebf2aa05a20848b3b55'
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityQuery},${stateQuery},${countryQuery}&limit=${limit}&appid=${apiKey}`

  fetch(geoUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      if (!data || data.length === 0) {
        console.log('No data found for the specified city.')
        return
      }

      let newCity = {
        name: data[0].name,
        state: data[0].state,
        stateCode: stateQuery,
        country: data[0].country,
        lat: data[0].lat.toString(),
        lon: data[0].lon.toString()
      }

      // Displays city information in console
      console.log(newCity)

      let cityExists = SAVED_CITIES.some(city => city.name === newCity.name && city.state === newCity.state)

      if (!cityExists) {
        SAVED_CITIES.push(newCity)
      }
      
      localStorage.setItem('savedCities', JSON.stringify(SAVED_CITIES))
      localStorage.setItem('currentCity', JSON.stringify(newCity.name))
      localStorage.setItem('currentState', JSON.stringify(newCity.state))
      localStorage.setItem('currentCountry', JSON.stringify(newCity.country))
      
      getForecast(newCity.lat, newCity.lon)
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })
}