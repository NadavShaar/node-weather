const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getWeatherForcast = require('./utils/getWeatherForcast.js');
const getGeocode = require('./utils/getGeocode.js');

// Init express
const app = express();
// Port
const port = process.env.PORT || 3000;

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setting handlebars for creating dynamic pages & "views" directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// ========== routes ==========

// Root
app.get('', (req, res) => {
    res.render('index', {
        title:  'Weather App',
        name: 'Created by Nadav Shaar'
    });
});

// About
app.get('/about', (req, res) => {
    res.render('about', {
        title:  'About me',
        name: 'Created by Nadav Shaar'
    });
});
app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'We couldn\'t find what you were looking for...'
    });
});

// Help
app.get('/help', (req, res) => {
    res.render('help', {
        title:  'Help',
        name: 'Created by Nadav Shaar'
    });
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'We couldn\'t find what you were looking for...'
    });
});

// Weather
app.get('/weather', (req, res) => {
    if(!req.query.address) return res.send({
        error: 'You must provide an address.'
    });
    getGeocode(req.query.address, (err, geoData) => {
        if(err) return res.send({error: 'Couldn\'t find the requested address.'});

        getWeatherForcast(geoData, (error, forcastData) => {
            if(error) return res.send({error: 'Couldn\'t find the requested address.'});
            res.send({
                address: req.query.address,
                ...forcastData
            });
        })
    });
});

// Products
app.get('/products', (req, res) => {
    if(!req.query.search) return res.send({
        error: 'You must provide a search term.'
    });
    res.send({
        products: []
    });
});

// 404
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'This page doesn\'t exist'
    });
});

// Running the server
app.listen(port, () => {
    console.log("Server is running.")
});