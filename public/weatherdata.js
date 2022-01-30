function weatherData(){
    $.ajax({
        url: "weather",
        success: 
        function(result){
            console.log(result)
            // Define data to update
            var temperature = result.temperature
            var wind = result.wind
            if(result.weather === undefined){
                var weather_result = ""
            }else{
                var weather_result = result.weather
            }
            
            weather = `
            <p>${temperature}°</p>
            <p>${weather_result}</p>
            <p>${wind}m/s</p>`


            $('#weather').html(weather);
            //console.log(result.data.stopPlace.estimatedCalls[0].destinationDisplay.frontText)
            setTimeout(function(){
                weatherData(); //this will send request again and again;
            }, 1000);
        }
    });
}