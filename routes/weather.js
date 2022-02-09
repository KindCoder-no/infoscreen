/*
MIT License

Copyright (c) 2022 KindCoder

https://github.com/KindCoder-no/infoscreen/blob/main/LICENSE
*/

// Include Packages
var express = require('express');
var router = express.Router();
var axios = require('axios');

// Create a weather data page
router.get('/weather', async function(req, res) {
    // Get todays date
    var today = new Date()

    // If Month is under 10/9 add a 0 before (example 1 becomes 01)
    if(today.getMonth() + 1 < 10){
        // If Month is under 10/9 add a 0 before
        var month = `0${today.getMonth() + 1}`
    }else{
        var month = today.getMonth() + 1
    }

    // If Hours is 24 or under 10/09
    if(today.getHours() === 24){
        // If Hours is under 24
        var hours = "00"
    }else{
        if(today.getHours() < 10){
            // If Hours is under 10/9 add a 0 before
            var hours = `0${today.getHours()}`
        }else{
            var hours = today.getHours()
        }
    }

    // If Date is under 10/9 add a 0 before (example 1 becomes 01)
    if(today.getDate() < 10){
        var date = `0${today.getDate()}`
    }else{
        var date = today.getDate()
    }

    // Define a datestring to search for in Yr API
    let fulldate = today.getFullYear() + "-" + month + "-" + date + "T" + hours + ":00:00Z"

    // Config for weatherapi
    var config = {
        method: 'get',
        url: `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${process.env.LAT}&lon=${process.env.LON}`,
        headers: { 
          'Content-Type': 'application/json', 
          'User-Agent': 'application/postscript'
        }
    };

    // Config Weather Icons
    var weatherIconconfig = {
        method: 'get',
        url: 'https://api.met.no/weatherapi/weathericon/2.0/legends',
        headers: { 
          'Content-Type': 'application/json', 
          'User-Agent': 'application/postscript'
        }
    };

    // Call API's
    const call = await axios(config)
    const weatherIcons = await axios(weatherIconconfig)

    // Define timeseries and data retrieved from API's
    var timeseries = call.data.properties.timeseries
    var weatherIconsdata = weatherIcons.data

    // Foreach timeseries
    timeseries.forEach(function(element, index){
        // If data is the right datetime create a response
        if(fulldate === element.time){
            // Define the result and input the data
            var weatherGetIcon = element.data.next_1_hours.summary.symbol_code 

            // Find Weather Icon
            for(var i in weatherIconsdata)
                if(i === weatherGetIcon){
                    var weatherIcon = weatherIconsdata[i].desc_nb
                }

            // Define response JSON data
            new_res = {
                temperature: element.data.instant.details.air_temperature,
                wind: element.data.instant.details.wind_speed,
                weather: weatherIcon,
                iconname: weatherGetIcon
            }
        }

        
    });

    // Send JSON response
    res.send(new_res)

});

// Export router module
module.exports = router;