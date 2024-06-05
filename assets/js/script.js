document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('.needs-validation')
  
  form.addEventListener('submit', function(event) {
      event.preventDefault()
      event.stopPropagation()

      if (form.checkValidity()) {
          let cityName = document.getElementById('city-name').value.trim()
          findCity(cityName)
      } else {
          form.classList.add('was-validated')
      }
  }, false)
})

function renderForecastList() {
  let city = 'St George'
  if (savedCities !== null) {
    city = savedCities[savedCities.length-1]
    console.log('Last city entered: ', savedCities[savedCities.length-1])
  }
  console.log('This is the city: ', city)
  findCity(city)
}

function convertDate(unixTimestamp) {
  // Convert to milliseconds
  let date = new Date(unixTimestamp * 1000);

  // Extract date components
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  let year = date.getFullYear();

  // Format the date as MM/DD/YYYY
  let formattedDate = `${month}/${day}/${year}`;

  return formattedDate
}

function filterForecastList(forecastList) {
  let dateTwo = '0000-00-00'
  const display= document.getElementById('forecast-container')
  display.innerHTML = '';
  for (let i = 0; i < forecastList.length; i++) {
    let forecast = forecastList[i]
    let dateOne = forecast.dt

    dateOne = convertDate(dateOne)
    
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
      date.textContent = `${dateOne}`
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
  }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
document.addEventListener('DOMContentLoaded', function () {
  renderForecastList()
})