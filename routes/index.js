/*
MIT License

Copyright (c) 2022 KindCoder

https://github.com/KindCoder-no/busstavla/blob/main/LICENSE
*/

// Include Packages
var express = require('express')
var router = express.Router()
const fs = require('fs');


// Tavle router
router.get('/', async function (req, res) {
    // Check if Tavla is installed
    if(process.env.INSTALLED === "TRUE"){
        // If Tavla is install, render Tavla
        
        let raw_spotifydata = fs.readFileSync('./config.json');
        let spotifydata = JSON.parse(raw_spotifydata);

        res.render('tavla', {
            access_token: spotifydata.spotify_access_token,
            tavle_name: process.env.TAVLE_NAME
        });
    }else{
        // If Tavla is not install, render welcome page
        res.render('welcome');
    }
});

// Export router module
module.exports = router;