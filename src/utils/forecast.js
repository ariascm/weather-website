//npm i request
const request = require('request')

// https://api.openweathermap.org/data/2.5/weather?lat=-32.8908&lon=-68.8272&appid=1472f72dbb0d310ac5828ed656cfca2f&units=metric


const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=1472f72dbb0d310ac5828ed656cfca2f&units=metric'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect with to weather service', undefined)
        } else if (body.cod != 200) {
            callback('Incorrect Latitude/Longitude', undefined)
        } else {
            const { temp, feels_like } = body.main
            const { description } = body.weather[0]

            callback(undefined, description + '. The temperature is ' + temp + ' and the feels like sensation ' + feels_like)
        }
    })
}

module.exports = forecast