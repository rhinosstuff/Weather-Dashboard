document.addEventListener('DOMContentLoaded', function() {
  let form = document.getElementsByClassName('needs-validation')
  
  form.addEventListener('submit', function(event) {
      event.preventDefault()
      event.stopPropagation()

      if (form.checkValidity()) {
          let formData = {
              city: document.getElementById('validationCustom03').value,
              state: document.getElementById('validationCustom04').value
          }

          console.log('Form Data:', formData)

      } else {
          form.classList.add('was-validated')
      }
  }, false)
})