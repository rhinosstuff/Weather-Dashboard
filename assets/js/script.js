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
  fiveDayContainer.classList = 'future-days d-flex justify-content-between gap-2'
  
  for (let i = 0; i < filteredForecast.length; i++) {
    let forecast = filteredForecast[i]
    
    let cardContainer = document.createElement('div')
    let cardBody = document.createElement('div')
    cardBody.classList = 'card-body'
    
    let date = document.createElement('h5')
    date.classList = 'date card-title mb-4 text-nowrap'
    
    let icon = document.createElement('img')
    icon.src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`
    icon.alt = forecast.weather[0].description
    
    let temp = document.createElement('h6')
    temp.classList = 'temp card-subtitle mb-4 text-nowrap'
    temp.textContent = `Temp: ${forecast.main.temp} °F`
    
    let wind = document.createElement('h6')
    wind.classList = 'wind card-subtitle mb-4 text-nowrap'
    wind.textContent = `Wind: ${forecast.wind.speed} MPH`
    
    let humi = document.createElement('h6')
    humi.classList = 'humi card-subtitle text-nowrap'
    humi.textContent = `Humidity: ${forecast.main.humidity} %`
    
    if (i === 0) {
      cardContainer.classList = 'current-day card container col-12 mb-4'
      date.classList = 'date card-title mb-4 text-nowrap h2'
      date.textContent = `${currentCity}, ${currentState} (${forecast.dt_txt.split(' ')[0]})`
      icon.classList = 'icon'
      cardBody.append(date)
      date.append(icon) 
      forecastContainer.append(cardContainer)
      forecastContainer.append(fiveDayContainer) 
    } else {
      cardContainer.classList = 'card container m-0'
      cardContainer.id = 'future-day-container'
      cardBody.classList = 'card-body'
      cardBody.id = 'future-day-card'
      date.textContent = `${forecast.dt_txt.split(' ')[0]}`
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
      let formatedDate = `${day}/${month}/${year}`

      forecast.dt_txt = `${formatedDate} ${time}`

      if (i === 0 || time === '00:00:00') {
        previousDate = date
        filteredForecast.push(forecast)
      }
    }
  })

  console.log(filteredForecast)
  displayForecast(filteredForecast)
}

//Dynamically displays the previous searched for cities
 
function displaySavedCities () {
  let cities = SAVED_CITIES
  cities.forEach(city => {
    let cityButton = document.createElement('button')
    cityButton.classList = 'city-button btn btn-secondary d-flex align-self-center mb-2 p-2 col-12'
    cityButton.type = 'button'
    cityButton.textContent = city

    let cityDelete = document.createElement('span')
    cityDelete.classList = 'city-delete ms-auto px-2'
    cityDelete.textContent = 'x'

    CITY_BUTTONS.append(cityButton)
    cityButton.append(cityDelete)

    // Add event listener for saved city click
    // Call findCity with the city name
    cityButton.addEventListener('click', function(event) {
      event.preventDefault()
      event.stopPropagation()
      findCity(city)  
    })

    // Add event listener for saved city delete
    // Call removeCity with the city name & refresh the list after deletion
    cityDelete.addEventListener('click', function(event) {
      event.preventDefault()
      event.stopPropagation()
      removeCity(city)
    })
  }) 
}

function removeCity(city) {
  let cities = SAVED_CITIES
  cities = cities.filter(c => c !== city)
  localStorage.setItem('savedCities', JSON.stringify(cities))
  SAVED_CITIES = JSON.parse(localStorage.getItem('savedCities'))

  CITY_BUTTONS.innerHTML = ''
  displaySavedCities()
}

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

document.addEventListener('DOMContentLoaded', function () {
  findCity(CURRENT_CITY, CURRENT_STATE, CURRENT_COUNTRY)
})