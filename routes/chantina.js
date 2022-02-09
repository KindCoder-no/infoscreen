/*
MIT License

Copyright (c) 2022 KindCoder

https://github.com/KindCoder-no/infoscreen/blob/main/LICENSE
*/

// Include Packages
var express = require('express');
var router = express.Router();
var axios = require('axios');

// Create Chantina data page
router.get('/chantina', async function(req, res) {
    // Define todays date
    const d = new Date();
    
    // Get day
    let day = d.getDay(); 

    // Chantina api call config
    var config = {
        method: 'get',
        url: 'https://api.chantina.no/getWeek',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        }
    };
    
    // Call API
    let apicall = await axios(config)

    // Get todays day 
    var today = apicall.data[day - 1]

    // Create response
    response = {
        today: today,
        matkalender: apicall.data
    }

    // Send JSON responsee
    res.send(response)
});

// Export router module
module.exports = router;