// acceso al form del index.hbs 
const weatherForm = document.querySelector('form')
// acceso al input
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    //para que no se reinicie el navegador luego de apretar el boton submit
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    // para rescatar del LADO DEL CLIENTE, el resultado de una URL
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data) => {

            if (data.error) {
                return messageOne.textContent = data.error
            }
            const { location, forecast } = data
            messageOne.textContent = 'Location: ' + location
            messageTwo.textContent = 'Forecast: ' + forecast

        })
    })
})