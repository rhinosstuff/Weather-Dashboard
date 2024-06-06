// Searches OpenWeather 5-Day Forecast API based on 'latitude' & 'longitude'
function getForecast(lat, lon) { 
  const units = 'imperial'
  const apiKey = '0f0384b7e7c02ebf2aa05a20848b3b55'
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
  
  fetch(weatherUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      if (!data || data.length === 0) {
        return
      }
      
      filterForecastList(data.list)
      let daysList = data.list
      daysList.forEach(day => console.log(day));
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error)
    })
}