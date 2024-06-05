let savedCities = JSON.parse(localStorage.getItem('savedCities'))

// Function to perform a search using the OpenWeather Geocoder API
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
      
      let city = data[0].name
      let lat = data[0].lat.toString()
      let lon = data[0].lon.toString()

      let newCity = [];
      if (savedCities !== null) {
        newCity = savedCities
      }
      
      if (!newCity.includes(city)){
        newCity.push(city)
        localStorage.setItem('savedCities', JSON.stringify(newCity))
      }
      
      console.log('This is the city: ', newCity)

      displayWeather(lat, lon) 
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })
}