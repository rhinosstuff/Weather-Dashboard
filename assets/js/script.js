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

function time() {
  let now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

console.log(`Time: ${hours}:${minutes}:${seconds}`);
}

time()