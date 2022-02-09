// Create function
function buss(){
    // Create ajax request
    $.ajax({
        url: "departures",
        success: 
        function(result){
            // Create string for HTML data
            var string = ""

            // Get departures and put them in an array
            var departuresArray = result.data.stopPlace.estimatedCalls

            // Go through every buss in array and create data
            for (const element of departuresArray) { 
                // Get Date
                var today = new Date()

                // Get departure Date
                var DepartureTime = new Date(element.expectedDepartureTime);

                // Get Difference to buss arrival
                var diffMs = (DepartureTime - today); // milliseconds between now & DepartureTime
                var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

                if(diffHrs === 1){
                    // If there is over 1 hour to arrival
                    let hour = DepartureTime.getHours();
                    let minutes = DepartureTime.getMinutes();
                    
                    // If minutes is under 10/9, add 0 before
                    if(minutes < 10){
                        var depTime =  hour + ":"  + "0" + minutes
                    }else{
                        var depTime =  hour + ":" + minutes
                    }
                }else if(diffMins > 15){
                    // If there is over 15 minutes to arrival
                    let hour = DepartureTime.getHours();
                    let minutes = DepartureTime.getMinutes();

                    // If minutes is under 10/9, add 0 before
                    if(minutes < 10){
                        var depTime =  hour + ":" + "0" + minutes 
                    }else{
                        var depTime =  hour + ":" + minutes
                    }
                }else if(diffMins < 1){
                    // If arrival is now, display "Nå"
                    var depTime = "Nå"
                }else{
                    // Else, display minutes untill arrival
                    var depTime = diffMins + " min"
                }

                if(diffHrs === 1){
                    // If there is over 1 hour to arrival set style to normal
                    var style = "bussitem"
                }else{
                    if(diffMins < 4){
                        // If there is under 4 minutes to arrival set style to danger
                        var style = "bussitem-marked-red"
                    }else if(diffMins < 6){
                        // If there is under 6 minutes to arrival set style to warning
                        var style = "bussitem-marked"
                    }else{
                        // Set style to normal
                        var style = "bussitem" 
                    }
                }

                // Add HTML data to string
                string += `
                <!-- Row -->
                <div class="row align-items-center ${style}">
                    <div class="col-5 ms-auto">
                        <i class="fas fa-bus"></i> ${element.destinationDisplay.frontText}
                    </div>
                    <div class="col-4 ms-auto">
                        ${depTime}
                    </div>
                </div>`
            }

            // Update tavla with buss data
            $('#busstavla').html(string); 

            // Set align to ""
            document.getElementById("busstavla").align=""

        }
    });

    // Repeat function every 30 seconds
    setTimeout(function(){
        buss();
    }, 30000);
}