require('dotenv').config();
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')

const newViewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', newViewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Batman'
    })
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
        return res.send({
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

app.get('*', (req, res) => {
    res.render('404page', {
        errorMessage: 'Page not found',
        title: '404 Page',
        name: 'Batman'
    })
})

app.listen(port, () => {
    console.log('Servers is up on port ' + port)
})