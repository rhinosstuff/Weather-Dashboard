const main = document.querySelector('main')
const forecastContainer = document.getElementById('forecast-container')

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

function displayForecast(filteredForecast) {
  forecastContainer.innerHTML = ''
  handleResize()

  let fiveDayContainer = document.createElement('div')
  fiveDayContainer.classList = 'd-flex justify-content-between'
  
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
      date.textContent = `${JSON.parse(localStorage.getItem('currentCity'))} (${forecast.dt_txt.split(' ')[0]})`
      icon.classList = 'icon'
      cardBody.append(date)
      date.append(icon) 
      forecastContainer.append(cardContainer)
      forecastContainer.append(fiveDayContainer) 
    } else {
      cardContainer.classList = 'card container col-lg-2 col-12 m-0'
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
}

function filterForecastList(forecastList) {
  let dateTwo = '0000-00-00'
  let filteredForecast = []
  
  for (let i = 0; i < forecastList.length; i++) {
    let forecast = forecastList[i]
    let [date, time] = forecast.dt_txt.split(' ')

    if (date !== dateTwo) {
      let dateSplit = date.split('-')
      let formatedDate = `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`

      forecast.dt_txt = `${formatedDate} ${time}`

      if (i === 0 || time === '00:00:00') {
        dateTwo = date
        filteredForecast.push(forecast)
      }
    } 
  }
  localStorage.setItem('filteredForecast', JSON.stringify(filteredForecast)) // remove when done
  console.log(filteredForecast)
  displayForecast(filteredForecast)
}

function displaySavedCities () {
  let cities = JSON.parse(localStorage.getItem('savedCities')) 
  
}

function handleResize() {
  // Get the new width and height of the window
  const width = window.innerWidth
  const height = window.innerHeight

  if (width < 1400) {
    main.className = 'container d-flex flex-column m-0 mw-100'
  } else {
    main.className = 'container d-flex flex-row m-0 mw-100'
  }

  if (width < 1000) {

  }
  
  
  // Log the new dimensions (or perform any other actions)
  console.log(`Width: ${width}, Height: ${height}`)
}

// Add the event listener for window resize
window.addEventListener('resize', handleResize)

document.addEventListener('DOMContentLoaded', function () {
  displayForecast(JSON.parse(localStorage.getItem('filteredForecast')))
  // renderForecast()
  // console.log(JSON.parse(localStorage.getItem('filteredForecast')))
})