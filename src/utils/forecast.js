const request = require('request')
const OPENWEATHER_TOKEN = process.env.OPENWEATHER_TOKEN

const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + OPENWEATHER_TOKEN + '&units=metric'
    console.log({ lat, lon })
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect with to weather service', undefined)
        } else if (body.cod != 200) {
            callback('Incorrect Latitude/Longitude', undefined)
        } else {
            const { temp, feels_like, humidity } = body.main
            const { description } = body.weather[0]

            callback(undefined, description + '. The temperature is ' + temp
                + ' and the feels like sensation ' + feels_like + '. The Humidity is ' + humidity + '%.')
        }
    })
}

module.exports = forecast