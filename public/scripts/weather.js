// Create function
function weather() {
    // Create ajax call
    $.ajax({
        url: "weather",
        success: 
        function(result){
            // Define temperature
            var temperature = result.temperature

            // Define wind
            var wind = result.wind

            // Define weather
            if(result.weather === undefined){
                var weather_result = ""
            }else{
                var weather_result = result.weather
            }
            
            // Create html string to update on Tavla
            var weather_res = `
            <br>
            <h3 class="text-white" style="width: 30%;">${temperature}°</h3>
            <h3 class="text-white align-middle" style="width: 30%;">${weather_result}</h3>
            <h3 class="text-white align-middle" style="width: 30%;">${wind}m/s</h3>`

            // Update data on Tavla
            $('#weathericon').attr('src', '/weather-icons/png/'+ result.iconname + '.png')
            $('#weather').html(weather_res);     

            // Repeat function every second
            setTimeout(function(){
                weather()
            }, 1000);       
        }
    });

   
}