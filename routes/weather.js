var express = require('express');
var router = express.Router();
var axios = require('axios');


// Create a weather data page
router.get('/weather', async function(req,res) {
    // Get todays date
    var today = new Date()
    // If Month is under 10/9 add a 0 before (example 1 becomes 01)
    if(today.getMonth() + 1 < 10){
        var month = `0${today.getMonth() + 1}`
    }else{
        var month = today.getMonth() + 1
    }

    if(today.getHours() + 1 < 10){
        var hours = `0${today.getHours() + 1}`
    }else{
        var hours = today.getHours() + 1
    }

    // Define a datestring to search for in Yr API
    let fulldate = today.getFullYear() + "-" + month + "-" + today.getDate() + "T" + hours + ":00:00Z"
    //var fulldate = "2022-01-29T18:00:00Z"
    //console.log(fulldate)
    // Config for weatherapi
    var config = {
        method: 'get',
        url: 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=63.4203976&lon=10.4839164',
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

    // Call API
    const call = await axios(config)
    const weatherIcons = await axios(weatherIconconfig)
    // Define timeseries retrieved from API
    var timeseries = call.data.properties.timeseries
    var weatherIconsdata = weatherIcons.data
    //console.log(weatherIconsdata)
    // For each timeseries check if datetime is right
    timeseries.forEach(function(element, index){
        // If data is the right datetime create a response
        if(fulldate === element.time){
            // Define the result and input the data
            var weatherGetIcon = element.data.next_1_hours.summary.symbol_code 
            //console.log(weatherGetIcon)
            var weatherIconsArray = [];
            //console.log(weatherGetIcon)

            for(var i in weatherIconsdata)
                //console.log(i)
                if(i === weatherGetIcon){
                    var weatherIcon = weatherIconsdata[i].desc_nb
                    //console.log(weatherIcon)

                }
                //weatherIconsArray.push(weatherIconsdata[i]);
            
            //console.log(weatherIconsArray[0])
            new_res = {
                temperature: element.data.instant.details.air_temperature,
                wind: element.data.instant.details.wind_speed,
                weather: weatherIcon
            }
            
          

        }
        
    });
    // Send JSON response with data
    res.send(new_res)
      
});

// Export router module
module.exports = router;