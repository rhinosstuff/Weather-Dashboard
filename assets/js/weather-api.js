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
      console.log(forecastList.length)

      for (let i = 0; i < 2; i++) {
        let forecast = forecastList[i]
        console.log(`Date and Time: ${forecast.dt_txt}`);
        console.log(`Temperature: ${forecast.main.temp} °F`);
        console.log(`Weather: ${forecast.weather[0].description}`);
        console.log(`Weather icon: ${forecast.weather[0].icon}`);
        console.log('---');
      }
      
      // Example: Iterate over the forecast data and log details
      // forecastList.forEach(forecast => {

      //   console.log(`Date and Time: ${forecast.dt_txt}`);
      //   console.log(`Temperature: ${forecast.main.temp}`);
      //   console.log(`Weather: ${forecast.weather[0].description}`);
      //   console.log(`Weather icon: ${forecast.weather[0].icon}`);
      //   console.log('---');
      // });
      
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error)
    })
}

// 2024-06-07 09:00:00