// Function to perform a search using the OpenWeather API
function displayWeather(lat, lon) {
  const units = 'imperial'
  const apiKey = '0f0384b7e7c02ebf2aa05a20848b3b55'
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
  // Perform the fetch request
  fetch(weatherUrl)
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
      const forecastList = data.list
      filterForecastList(forecastList)
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error)
    })
}