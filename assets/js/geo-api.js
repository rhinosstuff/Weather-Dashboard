const SAVED_CITIES = JSON.parse(localStorage.getItem('savedCities')) || []
const CURRENT_CITY = JSON.parse(localStorage.getItem('currentCity'))
const CURRENT_STATE = JSON.parse(localStorage.getItem('currentState'))
const CURRENT_COUNTRY = JSON.parse(localStorage.getItem('currentCountry'))

// Searches OpenWeather Geocoder API based on 'City Name'
function findCity(cityQuery, stateQuery, countryQuery) {
  const limit =  1
  const apiKey = '0f0384b7e7c02ebf2aa05a20848b3b55'
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityQuery},${stateQuery},${countryQuery}&limit=${limit}&appid=${apiKey}`

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

      let newCity = data[0];
      let city = newCity.name
      let lat = newCity.lat.toString()
      let lon = newCity.lon.toString()

      

      if (!SAVED_CITIES.includes(city)) {
        SAVED_CITIES.push(city);
      }
      
      localStorage.setItem('savedCities', JSON.stringify(SAVED_CITIES))
      localStorage.setItem('currentCity', JSON.stringify(city))
      localStorage.setItem('currentState', JSON.stringify(stateQuery))
      localStorage.setItem('currentCountry', JSON.stringify(countryQuery))
      
      getForecast(lat, lon) 

      data.forEach(item => console.log(item))
      data.forEach(data => console.log(`${data.name}, ${data.state}`))
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })
}