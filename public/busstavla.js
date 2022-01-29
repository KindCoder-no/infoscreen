function bussTavla(){
    // Create ajax request
    $.ajax({
        url: "departures",
        success: 
        function(result){
            var string = ""
            var departuresArray = result.data.stopPlace.estimatedCalls
            var departures = departuresArray.forEach(element => {
                element.frontText
            })
            for (const element of departuresArray) { 
                string.concat(element.destinationDisplay.frontText)
                //console.log(element.destinationDisplay.frontText);
                var today = new Date();
                var DepartureTime = new Date(element.expectedDepartureTime);
                var diffMs = (DepartureTime - today); // milliseconds between now & DepartureTime
                var diffDays = Math.floor(diffMs / 86400000); // days
                var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

                if(diffHrs === 1){
                    let hour = DepartureTime.getHours();
                    let minutes = DepartureTime.getMinutes();
                    if(minutes < 10){
                        var depTime =  hour + ":"  + "0" + minutes
                    }else{
                        var depTime =  hour + ":" + minutes
                    }
                }else if(diffMins > 15){
                    let hour = DepartureTime.getHours();
                    let minutes = DepartureTime.getMinutes();

                    if(minutes < 10){
                        var depTime =  hour + ":" + "0" + minutes 
                    }else{
                        var depTime =  hour + ":" + minutes
                    }
                }else if(diffMins < 1){
                    var depTime = "Nå"
                }else{
                    var depTime = diffMins + " min"
                }

                //var depTime = diffHrs
                string += 
                `<div class="row" style="margin-bottom: 1%; font-size: 150%;">
                    <div class="col">
                    ${element.destinationDisplay.frontText}
                    </div>
                    <div class="col-8">
                    ${depTime}
                    </div>
                </div>`
            }
            console.log(result.data.stopPlace.estimatedCalls)
            $('#busstavla').html(string); //insert text of test.php into your div
            //console.log(result.data.stopPlace.estimatedCalls[0].destinationDisplay.frontText)
            setTimeout(function(){
                bussTavla(); //this will send request again and again;
            }, 30000);
        }
    });
}