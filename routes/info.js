/*
MIT License

Copyright (c) 2022 KindCoder

https://github.com/KindCoder-no/infoscreen/blob/main/LICENSE
*/

// Include Packages
var express = require('express');
var router = express.Router();
var axios = require('axios');

// Create info router
router.get('/info', async function(req,res) {
    // Create data for API call
    var data = JSON.stringify({
        "collection": "screen",
        "database": "busstavla",
        "dataSource": "Cluster0"
    });
    
    // Create config for API call
    var config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-censq/endpoint/data/beta/action/find',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': process.env.MONGO_API_KEY
        },
        data : data
    };
    
    // Call API
    let apicall = await axios(config)
    
    // Get API results
    var apiresult = apicall.data.documents
    

    // Send result
    res.send(apiresult[0])
})

// Export router module
module.exports = router;