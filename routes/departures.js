/*
MIT License

Copyright (c) 2022 KindCoder

https://github.com/KindCoder-no/infoscreen/blob/main/LICENSE
*/

// Include Packages
var express = require('express');
var router = express.Router();
var axios = require('axios');

// Create Departures data page
router.get('/departures', async function(req, res) {
    // Create data query to use in api call
    var data = JSON.stringify({
        query: `{
        stopPlace(id: "NSR:StopPlace:${process.env.BUSSSTOP_ID}") {
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

    // Call api
    const call = await axios(config)

    // Send and display API data
    res.send(call.data)

});

// Export router module
module.exports = router;