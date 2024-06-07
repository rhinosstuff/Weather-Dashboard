let SAVED_CITIES = JSON.parse(localStorage.getItem('savedCities')) || []
let CURRENT_CITY = JSON.parse(localStorage.getItem('currentCity'))

// Searches OpenWeather Geocoder API based on 'City Name'
function findCity(cityQuery) {
  const limit =  1
  const apiKey = '0f0384b7e7c02ebf2aa05a20848b3b55'
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityQuery}&limit=${limit}&appid=${apiKey}`

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
      
      getForecast(lat, lon) 

      data.forEach(data => console.log(`${data.name}, ${data.state}`))
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })
}