/*
MIT License

Copyright (c) 2022 KindCoder

https://github.com/KindCoder-no/infoscreen/blob/main/LICENSE
*/

// Include Packages
var express = require('express');
var router = express.Router();
var axios = require('axios');
var SpotifyWebApi = require('spotify-web-api-node');
var session = require('express-session')
const fs = require('fs');

// Create Spotify SDK 
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.URL + "/spotify-callback"
});

// Define Spotify Scopes
scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private', 'user-read-playback-position', 'user-read-currently-playing', "user-read-playback-state", "user-modify-playback-state", "streaming"]


// Create spotify route
router.get('/spotify', async function(req, res) {
    if(spotifyApi.getAccessToken() === undefined){
        let raw_spotifydata = fs.readFileSync('./config.json');
        let spotifydata = JSON.parse(raw_spotifydata);
        
        //console.log(spotifydata)
        spotifyApi.setAccessToken(spotifydata.spotify_access_token)
    }

    // Try spotify call
    try {
        // Get playing song data
        var playing = await spotifyApi.getMyCurrentPlayingTrack()

        // Get song percentage
        var song_percentance =  (100 * playing.body.timestamp) / playing.body.progress_ms;
        //console.log(playing.body)

        // Define response
        response = {
            song_image: playing.body.item.album.images[1].url,
            song_lenght: millisToMinutesAndSeconds(playing.body.item.duration_ms),
            song_current_progress: millisToMinutesAndSeconds(playing.body.progress_ms),
            song_percentance: percentage(playing.body.progress_ms, playing.body.item.duration_ms),
            song_name: playing.body.item.name,
            isplaying: playing.body.is_playing
            //refresh_token: spotifyApi.getRefreshToken()
        }

        // Send response
        res.send(response)
    } catch (err) {
        // Check if user is logged in
        if(err.body === undefined){
            res.send("Nothing-playing")
        }else if(err.body === {}){
            res.send("Nothing-playing")
        }else{
            refresh_spotify_token()
            //res.send("Login-fail")
            res.send(err)
        }
    }
});

// Create skip song route
router.get('/next-song', async function(req, res) {
    // Skip User’s Playback To Next Track
    spotifyApi.skipToNext()
    .then(function() {
        res.send({message: "skipped"})
    }, function(err) {
    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    console.log('Something went wrong!', err);
    });
});


// Create skip to Previous 
router.get('/revious-song', async function(req, res) {
    // Skip User’s Playback To Previous Track 
    spotifyApi.skipToPrevious()
    .then(function() {
        res.send({message: "skipped"})
    }, function(err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
    });
});

// Create play/pause route
router.get('/play-pause', async function(req, res) {
    // Get playing song data
    var playing = await spotifyApi.getMyCurrentPlayingTrack()

    if(playing.body.is_playing === true){
        // Pause a User's Playback
        spotifyApi.pause()
        .then(function() {
            res.send({message: "success"})
        }, function(err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
        });
    }else{
        spotifyApi.play()
        .then(function() {
            res.send({message: "success"})
        }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
    }

   

    
})


// Create Spotify login route
router.get('/spotify-login', async function(req,res) {
    var html = spotifyApi.createAuthorizeURL(scopes)

    // Send client to Spotify AUTH
    res.redirect(html+"&show_dialog=true")
});

// Create Spotify callback router
router.get('/spotify-callback', async function(req,res) { 
    // Get code from callback
    const { code } = req.query;

    // Try authorizing Spotify
    try {
        var data = await spotifyApi.authorizationCodeGrant(code)

        // Get access_token and refresh_token
        const { access_token, refresh_token } = data.body;

        // Set access_token and refresh_token
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        // Set access_token in session
        req.session.access_token = access_token

        console.log(refresh_token)

        if(refresh_token != undefined){
            // Update data in json config file
            const fileName = './config.json';
            const file = require(fileName);

            // Set Spotify config to json file
            file.spotify_access_token = access_token;
            file.spotify_refresh_token = refresh_token;

            // Write json file
            fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
                if (err) return console.log(err);
                //console.log(JSON.stringify(file, null, 2));
                console.log('writing to ' + fileName);
            });
        }
        

        setInterval(() => {
            refresh_spotify_token()
        }, 3500000);

        // Send client to tavla
        res.redirect(process.env.URL);
    } catch (err) {
        console.log(err)
        res.redirect('/#/error/invalid-token/');
    }
});

// Function to reformat miliseconds to minutes and seconds
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

// Percentage calculator
function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
} 


// Refresh Spotify access_token
function refresh_spotify_token () {
    // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
    //console.log(spotifyApi.getRefreshToken())

    if(spotifyApi.getRefreshToken() === undefined){
        let raw_spotifydata = fs.readFileSync('./config.json');
        let spotifydata = JSON.parse(raw_spotifydata);
        
        //console.log(spotifydata)
        spotifyApi.setRefreshToken(spotifydata.spotify_refresh_token)
    }else{
        spotifyApi.refreshAccessToken().then(
            function(data) {
            console.log('The access token has been refreshed!');
        
            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
            
            console.log(spotifyApi.getAccessToken())
            // Set access_token in session
            //req.session.access_token = data.body['access_token']

            if(data.body['access_token'] != undefined){
                //console.log(data.body['access_token'])
                // Update json config
                const fileName = './config.json';
                const file = require(fileName);
    
                // Set Spotify config to json file
                file.spotify_access_token = data.body['access_token'];
                file.spotify_refresh_token = spotifyApi.getRefreshToken();
                // Write json file
                fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
                    if (err) return console.log(err);
                });
            }
            
            },
            function(err) {
            console.log('Could not refresh access token', err);
            }
        );
    }

    
}




// Export router module
module.exports = router;