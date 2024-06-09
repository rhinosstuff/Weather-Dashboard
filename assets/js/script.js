const CITY_BUTTONS = document.getElementById('city-buttons')

// Dynamically displays the city forecast elements
// Resets the forecastContainer innerHTML everytime the function is called
// The current-day container is displayed differently then the future-day-card
// Resets the CITY_BUTTONS innerHTML then calls the displaySavedCities() 
function displayForecast(filteredForecast) {
  let currentCity = JSON.parse(localStorage.getItem('currentCity'))
  let currentState = JSON.parse(localStorage.getItem('currentState'))
  
  const forecastContainer = document.getElementById('forecast-container')
  forecastContainer.innerHTML = ''

  let fiveDayContainer = document.createElement('div')
  fiveDayContainer.classList = 'five-day-container d-flex justify-content-between gap-3'
  
  for (let i = 0; i < filteredForecast.length; i++) {
    let forecast = filteredForecast[i]
    
    let cardContainer = document.createElement('div')
    
    let date = document.createElement('h5')
    date.classList = 'date mb-4 text-nowrap'
    
    let icon = document.createElement('img')
    icon.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`
    icon.alt = forecast.weather[0].description
    icon.style = 'width: 50px'
    
    let temp = document.createElement('h6')
    temp.classList = 'temp mb-4 text-nowrap'
    temp.textContent = `Temp: ${forecast.main.temp} °F`
    
    let wind = document.createElement('h6')
    wind.classList = 'wind mb-4 text-nowrap'
    wind.textContent = `Wind: ${forecast.wind.speed} MPH`
    
    let humi = document.createElement('h6')
    humi.classList = 'humi text-nowrap'
    humi.textContent = `Humidity: ${forecast.main.humidity} %`
    
    if (i === 0) {
      cardContainer.classList = 'current-day card card-body col-12 mb-4'
      date.classList = 'date mb-4 text-wrap h2'
      date.textContent = `${currentCity}, ${currentState} (${forecast.dt_txt.split(' ')[0]})`
      icon.classList = 'icon'
      cardContainer.append(date)
      date.append(icon) 
      forecastContainer.append(cardContainer)
      forecastContainer.append(fiveDayContainer) 
    } else {
      cardContainer.classList = 'future-day card card-body'
      date.textContent = `${forecast.dt_txt.split(' ')[0]}`
      icon.classList = 'icon mb-4'
      cardContainer.append(date)
      cardContainer.append(icon)
      fiveDayContainer.append(cardContainer)
    }
    
    cardContainer.append(temp)
    cardContainer.append(wind)
    cardContainer.append(humi)
  }
  CITY_BUTTONS.innerHTML = ''
  displaySavedCities()
}

// Filters the returned data from the getForecast() on weather-api.js
// Filters based on the date & time so that there is only one entry per date then stores it in new array
// The first entry in the recieved data will always pe stored as the current date regardless of time
// Then calls displayForecast()
function filterForecastList(forecastList) {
  let previousDate = '0000-00-00'
  let filteredForecast = []
  
  forecastList.forEach((forecast, i) => {
    let [date, time] = forecast.dt_txt.split(' ')
    if (date !== previousDate) {
      let [year, month, day] = date.split('-')
      let formatedDate = `${month}/${day}/${year}`

      forecast.dt_txt = `${formatedDate} ${time}`

      if (i === 0 || time === '00:00:00') {
        previousDate = date
        filteredForecast.push(forecast)
      }
    }
  })

  // Displays forecast information in console
  console.log('Filtered Forecast: ', filteredForecast)
  displayForecast(filteredForecast)
}

// Dynamically displays the previous searched for cities
// cityButton will call findCity() updating displayed forecast
// cityDelete will call removeCity() removing city button
function displaySavedCities () {
  let cities = SAVED_CITIES
  
  cities.forEach(city => {
    let cityButton = document.createElement('button')
    cityButton.classList = 'city-button btn btn-secondary d-flex align-self-center mb-2 p-2 col-12'
    cityButton.type = 'button'
    cityButton.textContent = `${city.name}, ${city.state}`

    let cityDelete = document.createElement('span')
    cityDelete.classList = 'city-delete ms-auto px-2'
    cityDelete.textContent = 'x'

    CITY_BUTTONS.append(cityButton)
    cityButton.append(cityDelete)

    cityButton.addEventListener('click', function(event) {
      event.preventDefault()
      event.stopPropagation()
      getForecast(city.lat, city.lon)  
    })

    cityDelete.addEventListener('click', function(event) {
      event.preventDefault()
      event.stopPropagation()
      console.log('Remove: ', city)
      removeCity(city)
    })
  }) 
}

// Checks to see which city was clicked and removes it from SAVED_CITIES
function removeCity(city) {
  let cities = SAVED_CITIES
  
  cities = cities.filter(c => !(c.name === city.name && c.state === city.state))
  
  localStorage.setItem('savedCities', JSON.stringify(cities))
  SAVED_CITIES = JSON.parse(localStorage.getItem('savedCities'))

  CITY_BUTTONS.innerHTML = ''
  displaySavedCities()
}

// Checks to make sure valid data was entered into form before submitting
document.addEventListener('DOMContentLoaded', function() {
  let form = document.querySelector('.needs-validation')
  
  form.addEventListener('submit', function(event) {
      event.preventDefault()
      event.stopPropagation()

      if (form.checkValidity()) {
          let cityInput = document.getElementById('city-input').value.trim()
          let stateInput = document.getElementById('state-input').value
          let countryInput = document.getElementById('country-input').value
          findCity(cityInput, stateInput, countryInput)
          document.getElementById('city-input').value = ''
          document.getElementById('state-input').value = ''
          form.classList.remove('was-validated')
      } else {
          form.classList.add('was-validated')
      }
  }, false)
})

// Initializes page, if no previous local storage searches runs a default search
document.addEventListener('DOMContentLoaded', function () {
  if (CURRENT_CITY !== null) {
    findCity(CURRENT_CITY, CURRENT_STATE, CURRENT_COUNTRY)
  } else {
    findCity('St. George', 'UT', 'US') 
  } 
})