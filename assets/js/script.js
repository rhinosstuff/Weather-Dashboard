document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('.needs-validation')
  
  form.addEventListener('submit', function(event) {
      event.preventDefault()
      event.stopPropagation()

      if (form.checkValidity()) {
          let cityName = document.getElementById('city-name').value.trim()
          console.log('cityQuery:', cityName)
          findCity(cityName)
      } else {
          form.classList.add('was-validated')
      }
  }, false)
})

function filterForecastList(forecastList) {

  console.log(forecastList.length)

      for (let i = 0; i < forecastList.length; i++) {
        let forecast = forecastList[i]
        console.log(forecast)
        // console.log(`Date and Time: ${forecast.dt_txt}`);
        // console.log(`Temperature: ${forecast.main.temp} °F`);
        // console.log(`Weather: ${forecast.weather[0].description}`);
        // console.log(`Weather icon: ${forecast.weather[0].icon}`);
        // console.log('---');
      }
      
      // Example: Iterate over the forecast data and log details
      // forecastList.forEach(forecast => {

      //   console.log(`Date and Time: ${forecast.dt_txt}`);
      //   console.log(`Temperature: ${forecast.main.temp}`);
      //   console.log(`Weather: ${forecast.weather[0].description}`);
      //   console.log(`Weather icon: ${forecast.weather[0].icon}`);
      //   console.log('---');
      // });

}