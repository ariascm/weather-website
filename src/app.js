require('dotenv').config();
// path is include in node core modules. It doesnt require previous installation
const path = require('path')
// express require node i express
const express = require('express')
// hbs para agregar partials -> porciones de templates que se comparten entre las views
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
// Obtiene el PUERTO que sera proveeido por la app que levanta a PRODUCCIÓN (para localhost va a setear por default puerto = 3000)
const port = process.env.PORT || 3000

// Variables del Core de Node que indican la ruta y el archivo actual.
// console.log(__dirname)
// console.log(__filename)

// *** DEFINE PATHS FOR EXPRESS CONFIG ***
//creamos una ruta que apunte a donde estan nuestros archivos estaticos ej: index.html, fotos, videos, css, etc.
const publicDirectoryPath = path.join(__dirname, '../public')

// npm i hbs -> setup handlebars engine for express config
app.set('view engine', 'hbs')   // Con solo esta linea luego de instalaro se configura handlers en express. for create dinamic templates
// lo vamos a usar para reemplazar el index.html y convertirlo en una pagina dinamica, para eso debemos volver a agregar el app.get('')
// ya que la pagina ahora esta dentro del views/index.hbs

//Como setear otro path para que Express no lea el path por default para los templates (views). 1) cambiamos el nombre de la carpeta
// public/views -> public/templates/views
//seteamos el nuevo path para views location
const newViewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', newViewsPath)
hbs.registerPartials(partialsPath)


// SUPONEMOS QUE NUESTRA WEB ES app.com  (localhost:3000)
// utilizamos el metodo "use" y fijamos la ruta estatica. "localhost:3000" siempre ingresará a esta ruta, entonces ya no es necesario
// tener app.get('')
app.use(express.static(publicDirectoryPath))
// app.get('', (req, res) => {              // ruta por default (localhost:3000) 
//     res.send('Hello express')
// })


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Batman'
    })             //Luego de eliminar de la carpeta public el index.html lo reemplazamos por views/index.hbs
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Batman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is Help text',
        title: 'Help',
        name: 'Batman'
    })
})

// en el navegador-> localhost:3000/weather
app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an Address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast,
                location,
                address: req.query.address
            })

        })

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({     // Seteamos Return p/q se frene luego de devolver la respuesta, sino da error al enviar res.send dos veces
            error: 'You must provide a serch term'
        })
    }

    console.log(req.query.search)
    res.send({ products: [] })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        errorMessage: 'Help Article not found',
        title: '404 Page',
        name: 'Batman'
    })
})

//Agregamos un comodín en caso de que no exista la URL ingresada
app.get('*', (req, res) => {
    res.render('404page', {
        errorMessage: 'Page not found',
        title: '404 Page',
        name: 'Batman'
    })
})

// Inicializa el server en el puerto 3000 (comunmente usado en desarrollo) en otros ambientes cambia. "localhost:3000"
app.listen(port, () => {
    console.log('Servers is up on port ' + port)
})