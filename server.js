const express = require('express')
const mongoose = require('mongoose')
var dotenv = require('dotenv');
const app = express()
const port = 80

console.log("Starting webserver")

dotenv.config();
// Direct Mongoose Connection if needed
/*
// Connection with username/password and ip
mongoose.connect('mongodb+srv://<Username>/:<PASSWORD>@<IP>/busstavla?retryWrites=true&w=majority')

// Connection on localhost
//mongoose.connect('mongodb://192.168.1.185:27017/busstavla')
const db = mongoose.connection


db.on('error', (error) => console.error(error))
db.once('open', () => console.log('\x1b[32m%s\x1b[0m', `[Core-Database] Connected to Database`))
*/


app.use(express.json())

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

// Define Routes
var chantinaRouter = require('./routes/chantina')
var departuresRouter = require('./routes/departures')
var indexRouter = require('./routes/index')
var newsRouter = require('./routes/news')
var weatherRouter = require('./routes/weather')

// Use Routes
app.use('/', chantinaRouter);
app.use('/', departuresRouter);
app.use('/', indexRouter);
app.use('/', newsRouter);
app.use('/', weatherRouter);


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})