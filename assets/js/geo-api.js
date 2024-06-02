// Function to perform a search using the OpenWeather API
function findCity(city) {
  const limit =  1
  const apiKey = '0f0384b7e7c02ebf2aa05a20848b3b55'
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`
  // Perform the fetch request
  fetch(geoUrl)
    .then(response => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      // Parse the JSON response
      return response.json()
    })
    .then(data => {
      // Check if data.items is available
      if (!data || data.length === 0) {
        return
      }
      
      for (let i = 0; i < data.length; i++) {
        let city = data[i]
        console.log(`City Name: ${city.name}`)
        console.log(`City Latitude: ${city.lat}`)
        console.log(`City Longitude: ${city.lon}`)
      }
      
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error)
    })
}