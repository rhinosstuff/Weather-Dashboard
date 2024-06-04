// Function to perform a search using the OpenWeather Geocoder API
function findCity(cityQuery) {
  const limit =  1
  const apiKey = '0f0384b7e7c02ebf2aa05a20848b3b55'
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityQuery}&limit=${limit}&appid=${apiKey}`

  console.log('geoURL: ', geoUrl)
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
      
      let lat = data[0].lat.toString()
      let lon = data[0].lon.toString()
      displayWeather(lat, lon)

      console.log(`City Name: ${data[0].name}`)
      console.log(`City Latitude: ${lat}`)
      console.log(`City Longitude: ${lon}`)
      
      
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })
}