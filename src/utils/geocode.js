//npm i request
const request = require('request')

const geocode = (address, callback) => {
    // encodeURIComponent -> convierte los caracteres especiales ( ?,!, etc ) en caracteres legibles para la URI ( %3F )
    const url = 'https://geocode.maps.co/search?q=' + encodeURIComponent(address) + '&api_key=66395a2391e0c422422264plr187579'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to Geocoding service!', undefined)
        } else if (body.length === 0) {
            callback('Location not available. Try another!', undefined)
        } else {
            // const data = {
            //     latitude: body[0].lat,
            //     longitude: body[0].lon,
            //     location: body[0].display_name
            // }
            const { lat: latitude, lon: longitude, display_name: location } = body[0]
            data = { latitude, longitude, location }

            callback(undefined, data)
        }
    })
}


module.exports = geocode