/*
MIT License

Copyright (c) 2022 KindCoder

https://github.com/KindCoder-no/infoscreen/blob/main/LICENSE
*/

// Include Packages
const express = require('express')
var dotenv = require('dotenv')
var session = require('express-session')
const consolelog = require('./lib/consolelog')
const { auth, requiresAuth } = require('express-openid-connect');
const bodyParser = require('body-parser');

// Include Dotenv Config
dotenv.config()

// Create app
const app = express()

// Get Port from Dotenv
const port = process.env.PORT

// Log Web server Start Event
console.log('\x1b[33m%s\x1b[0m', `[${consolelog.clock()}][Core-Services] Starting services`)
console.log('\x1b[33m%s\x1b[0m', `[${consolelog.clock()}][Core-Webserver] Starting...`)

// Trust Proxy
app.set('trust proxy', 1)

// Set Session
app.use(session({
    secret: 'Monke',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// Use Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Auth0 Config
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_CLIENT_SECRET,
    baseURL: process.env.URL,
    clientID:  process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_DOMAIN
  };

// Use Auth0 Config
app.use(auth(config));

// Use JSON
app.use(express.json())

// Set View Engine
app.set('view engine', 'ejs')

// Set Public directory
app.use(express.static(__dirname + '/public'))

// Define Routes
var indexRouter = require('./routes/index')
var departuresRouter = require('./routes/departures')
var chantinaRouter = require('./routes/chantina')
var weatherRouter = require('./routes/weather')
var newsRouter = require('./routes/news')
var spotifyRouter = require('./routes/spotify')
var infoRouter = require('./routes/info')
var imagegalleryRouter = require('./routes/image-gallery')

var chromecastRouter = require('./routes/chromecast')
var adminRouter = require('./routes/admin')

// Use Routes
app.use('/', indexRouter)
app.use('/', departuresRouter)
app.use('/', chantinaRouter)
app.use('/', weatherRouter)
app.use('/', newsRouter)
app.use('/', spotifyRouter)
app.use('/', infoRouter)
app.use('/', imagegalleryRouter)

app.use('/chromecast', chromecastRouter)
app.use('/admin', adminRouter)

app.get('/loggedin', (req, res) => {
    res.send(req.oidc.isAuthenticated());
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => {
    console.log('\x1b[32m%s\x1b[0m', `[${consolelog.clock()}][Core-Webserver] Website Started on port: ${port}`)
})