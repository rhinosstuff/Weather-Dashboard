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
  let dateTwo = '0000-00-00'
  const display= document.getElementById('forecast-container')
  for (let i = 0; i < forecastList.length; i++) {
    let forecast = forecastList[i]
    let dateOne = forecast.dt_txt.split(' ')[0]
    
    if (dateOne !== dateTwo) {
      console.log(forecast)
      dateTwo = dateOne
      let cardContainer = document.createElement('div')
      let cardBody = document.createElement('div')
      let date = document.createElement('h5')
      let icon = document.createElement('h6')
      let temp = document.createElement('h6')
      let wind = document.createElement('h6')
      let humi = document.createElement('h6')
      if (i === 0) {
        cardContainer.classList = 'card container col-12 mb-4'  
      } else {
        cardContainer.classList = 'card container col-lg-2 col-12 m-0'
      }
      cardBody.classList = 'card-body'
      date.classList = 'date card-title mb-4 text-nowrap'
      date.textContent = `${dateOne.split('-')[1]}/${dateOne.split('-')[2]}/${dateOne.split('-')[0]}`
      icon.classList = 'icon card-subtitle mb-4 text-muted text-nowrap'
      icon.textContent = `${forecast.weather[0].icon}`
      temp.classList = 'temp card-subtitle mb-4 text-muted text-nowrap'
      temp.textContent = `Temp: ${forecast.main.temp} °F`
      wind.classList = 'wind card-subtitle mb-4 text-muted text-nowrap'
      wind.textContent = `Wind: ${forecast.wind.speed} MPH`
      humi.classList = 'humi card-subtitle text-muted text-nowrap'
      humi.textContent = `Humidity: ${forecast.main.humidity} %`
      
      display.append(cardContainer)
      cardContainer.append(cardBody)
      cardBody.append(date)
      cardBody.append(icon)
      cardBody.append(temp)
      cardBody.append(wind)
      cardBody.append(humi)
    }
    // console.log(`Date and Time: ${forecast.dt_txt}`);
    // console.log(`Temperature: ${forecast.main.temp} °F`);
    // console.log(`Weather: ${forecast.weather[0].description}`);
    // console.log(`Weather icon: ${forecast.weather[0].icon}`);
    // console.log('---');
  }
}