function spotify() {
    $.ajax({
        url: "spotify",
        success: 
        function(result){
            // Check if user is logged in, and if anything is playing
            if(result === "Login-fail"){
                var song_image = "https://cdn.discordapp.com/emojis/880802613212377129.webp?size=240&quality=lossless"
                var song_lenght = "0:00"
                var song_current_progress = "0:00"
                var song_percentance = "0"
                var song_name = 'Klarte ikke laste (<a href="/spotify-login">Logg inn</a>)'
            }else if(result === "Nothing-playing"){
                var song_image = "https://cdn.discordapp.com/emojis/880802613212377129.webp?size=240&quality=lossless"
                var song_lenght = "0:00"
                var song_current_progress = "0:00"
                var song_percentance = "0"
                var song_name = 'Ingenting Spiller akkurat nå'
            }else{
                var song_image = result.song_image
                var song_lenght = result.song_lenght
                var song_current_progress = result.song_current_progress
                var song_percentance = result.song_percentance
                var song_name = result.song_name
            }

            $('#song_name').html(song_name);
            $('#song_lenght').html(song_lenght);
            $('#song_current').html(song_current_progress);
            $("#song_image").attr('src', song_image);
            document.getElementById("song_progress").style.width=`${song_percentance}%`;
            
        }
    });
    setTimeout(function(){
        spotify(); //this will send request again and again;
    }, 1000);
}

function spotifyplayer(access_token, name) {
    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = access_token;
        const player = new Spotify.Player({
            name: name,
            getOAuthToken: cb => { cb(token); },
            volume: 0.5
        });
        player.activateElement();
        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });
        
        player.addListener('initialization_error', ({ message }) => {
            console.error(message);
        });

        player.addListener('authentication_error', ({ message }) => {
            console.error(message);
        });

        player.addListener('account_error', ({ message }) => {
            console.error(message);
        });

        /*document.getElementById('togglePlay').onclick = function() {
            player.togglePlay();
        };*/

        player.connect();
    }
}