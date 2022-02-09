/*
MIT License

Copyright (c) 2022 KindCoder

https://github.com/KindCoder-no/infoscreen/blob/main/LICENSE
*/

// Include Packages
var express = require('express');
var router = express.Router();
var axios = require('axios');

// Create data page
router.get('/image-gallery', async function(req, res) {
    // Create API call data
    var data = JSON.stringify({
        "collection": "image-database",
        "database": "busstavla",
        "dataSource": "Cluster0"
    });

    // Create API call config
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

    // Define results array
    var result = []
    
    // Get documents from API
    var apiresult = apicall.data.documents

    // For each message, add to array
    apiresult.forEach(index => {
        result.push(index.message)
    })

    // Send response
    res.send(apicall.data.documents)
});

// Export router module
module.exports = router;