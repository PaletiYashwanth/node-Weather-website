const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express.js
const publicPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup Handle Bars and View Engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) 

//Static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Yashwanth"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Yashwanth"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Yashwanth",
        helpText: "This is some help texts"
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "please enter a valid address"
        })
    }
    geocode(req.query.address,(error,{ latitude, longitude, location} = {} )=>{
        if(error){
            return res.send({ error })
        } 
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
      })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: "Please enter a search value"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: "404",
        name: "Yashwanth",
        errorMessage:"Help data not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: "404",
        name: "Yashwanth",
        errorMessage: "Page not found"
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})