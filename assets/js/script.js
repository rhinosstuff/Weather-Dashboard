let currentCity = JSON.parse(localStorage.getItem('currentCity'))

document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('.needs-validation')
  
  form.addEventListener('submit', function(event) {
      event.preventDefault()
      event.stopPropagation()

      if (form.checkValidity()) {
          let cityName = document.getElementById('city-name').value.trim()
          findCity(cityName)
          document.getElementById('city-name').value = ''
      } else {
          form.classList.add('was-validated')
      }
  }, false)
})

function renderForecast() {
  let city = 'St George'
  if (savedCities !== null) {
    city = currentCity
    console.log('Last city entered: ', currentCity)
  }
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

function displayForecast(filteredForecast) {
  const forecastContainer = document.getElementById('forecast-container')
  forecastContainer.innerHTML = ''

  let fiveDayContainer = document.createElement('div')
  fiveDayContainer.classList = 'd-flex'
  
  for (let i = 0; i < filteredForecast.length; i++) {
    let forecast = filteredForecast[i]
    let dateOne = forecast.dt
    dateOne = convertDate(dateOne)

    
    let cardContainer = document.createElement('div')
    let cardBody = document.createElement('div')
    cardBody.classList = 'card-body'
    let date = document.createElement('h5')
    date.classList = 'date card-title mb-4 text-nowrap'
    let icon = document.createElement('img')
    icon.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`
    icon.alt = forecast.weather[0].description
    let temp = document.createElement('h6')
    temp.classList = 'temp card-subtitle mb-4 text-muted text-nowrap'
    temp.textContent = `Temp: ${forecast.main.temp} °F`
    let wind = document.createElement('h6')
    wind.classList = 'wind card-subtitle mb-4 text-muted text-nowrap'
    wind.textContent = `Wind: ${forecast.wind.speed} MPH`
    let humi = document.createElement('h6')
    humi.classList = 'humi card-subtitle text-muted text-nowrap'
    humi.textContent = `Humidity: ${forecast.main.humidity} %`
    
    if (i === 0) {
      cardContainer.classList = 'card container col-12 mb-4'
      date.textContent = `${JSON.parse(localStorage.getItem('currentCity'))} (${dateOne})`
      icon.classList = 'icon'
      cardBody.append(date)
      date.append(icon) 
      forecastContainer.append(cardContainer)
      forecastContainer.append(fiveDayContainer) 
    } else {
      cardContainer.classList = 'card container col-lg-2 col-12 m-0'
      date.textContent = `${dateOne}`
      icon.classList = 'icon mb-4'
      cardBody.append(date)
      cardBody.append(icon)
      fiveDayContainer.append(cardContainer)
    }
    
    
    cardContainer.append(cardBody)
    cardBody.append(temp)
    cardBody.append(wind)
    cardBody.append(humi)
  }
}

function filterForecastList(forecastList) {
  let dateTwo = '0000-00-00'
  let filteredForecast = []
  
  for (let i = 0; i < forecastList.length; i++) {
    let forecast = forecastList[i]
    let dateOne = forecast.dt
    let time = forecast.dt_txt.split(' ')[1]

    dateOne = convertDate(dateOne)
    
    if (dateOne !== dateTwo) {
      if (i === 0 || time === '00:00:00') {
        dateTwo = dateOne
        filteredForecast.push(forecastList[i])
      }
    } 
  }
  console.log(filteredForecast)
  displayForecast(filteredForecast)
}

function displaySavedCities () {
  let cities = JSON.parse(localStorage.getItem('savedCities')) 
  
}

document.addEventListener('DOMContentLoaded', function () {
  renderForecast()
})