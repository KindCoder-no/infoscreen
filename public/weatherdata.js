function weatherData(){
    $.ajax({
        url: "weather",
        success: 
        function(result){
            console.log(result)
            // Define data to update
            var temperature = result.temperature
            var wind = result.wind
            var weather = result.weather
            
            weather = `
            ${temperature}°
            <br>
            ${weather}
            <br>
            ${wind}m/s 
            `


            $('#weather').html(weather);
            //console.log(result.data.stopPlace.estimatedCalls[0].destinationDisplay.frontText)
            setTimeout(function(){
                weatherData(); //this will send request again and again;
            }, 1000);
        }
    });
}