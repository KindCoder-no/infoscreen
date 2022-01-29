const express = require('express')
const app = express()
const port = 80

console.log("Starting webserver")

app.use(express.json())

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))

var indexRouter = require('./routes/index')

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})