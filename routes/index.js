var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');
var axios = require('axios');
const getWeather = require('current-weather-data')

// Old Tavle (Will change URL)
router.get('/', async function(req, res) {
    res.render('index');
});

// New Tavle (Will change URL)
router.get('/new', async function(req,res) {
    res.render('new-index');
})

router.get('/new-weather', function(req,res) {
 
    const location = {
        lat: 57.123456,
        lon: 11.543212
    }
    
    getWeather(location)
        .then(weather => {
            console.log(`The temperature here is ${weather.temperature.value}`)
        })

        res.send("Hei")
})

// Create Departures data page
router.get('/departures', async function(req,res) {

    // Json stringify query Data
    // Stopplace: Charlottenlund VGS (43916)
    var data = JSON.stringify({
    query: `{
    stopPlace(id: "NSR:StopPlace:43916") {
        id
        name
        estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {
        realtime
        aimedArrivalTime
        aimedDepartureTime
        expectedArrivalTime
        expectedDepartureTime
        actualArrivalTime
        actualDepartureTime
        date
        forBoarding
        forAlighting
        destinationDisplay {
            frontText
        }
        serviceJourney {
            journeyPattern {
            line {
                id
                name
                transportMode
                description
                publicCode
                transportSubmode
                url
                journeyPatterns {
                name
                id
                line {
                    id
                }
                }
            }
            }
        }
        }
    }
    }`,
    variables: {}
    });

    // Config for API Call
    var config = {
    method: 'post',
    url: 'https://api.entur.io/journey-planner/v3/graphql',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };

    // Call API
    const call = await axios(config)

    // Send and display API data
    res.send(call.data)
});

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
    console.log(fulldate)
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

    // For each timeseries check if datetime is right
    timeseries.forEach(function(element, index){
        // If data is the right datetime create a response
        if(fulldate === element.time){
            // Define the result and input the data
            var weatherGetIcon = element.data.next_1_hours.summary.symbol_code 
            //console.log(weatherGetIcon)
            var weatherIconsArray = [];
            console.log(weatherGetIcon)

            for(var i in weatherIconsdata)
                ///console.log(i)
                if(i === weatherGetIcon){
                    var weatherIcon = weatherIconsdata[i].desc_nb
                    console.log(weatherIcon)

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


router.get('/chantina', async function(req,res,next) {
    // Call Web scraping function and send results
    const ret = SearchChantina().then(ret => res.send(ret) );
});



async function SearchChantina(){
    // Define browser/puppeteer
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    const url = `https://chantina.no`;
    await page.goto(url);

    // Get text from chantina.no
    var mat = await page.evaluate( () =>  document.querySelector('h1.maten').innerText )
    var matpris = await page.evaluate( () =>  document.querySelector('h1.DagensPris').innerText )

    // Get Calender from chantina.no
    const matkalender = await page.evaluate( () =>  Array.from(document.querySelectorAll('p.mat')).map((logo) => logo.innerText) )
    const matkalenderpris = await page.evaluate( () =>  Array.from(document.querySelectorAll('p.pris')).map((logo) => logo.innerText) )
    
    if(mat === ""){
        var today = "Ingenting"
    }else{
        var today = mat
    }
    // Create json data response
    res = {
        today: today,
        todayprice: matpris,
        matkalender: matkalender,
        matkalenderprices: matkalenderpris
    }

    // Return json data
    return res

    // Close browser/puppeteer
    await browser.close();
}


// Export router module
module.exports = router;