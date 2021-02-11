const express = require('express')
const path= require('path')
const hbs  = require('hbs')
const geoUtil = require('../utils/geocode')
const forecast = require('../utils/forecast')
const app = express()
const port = process.env.PORT || 3000

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

//Definir paths para la config de express

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Seteo handelbars y path de las views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Seteo del directorio static
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Joaquin Carvajal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Joaquin Carvajal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        msg: 'This is a help message',
        name: 'Joaquin Carvajal'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must specify an address'
        })
    }
    geoUtil(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location: location,
                forecastData: forecastData
            })
          })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        productos: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article',
        name: 'Joaquin Carvajal'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Joaquin Carvajal'
    })
})

app.listen(port, () => {
    console.log('Server running on port ' + port)
})