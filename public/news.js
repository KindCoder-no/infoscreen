function news(){
    // Create ajax request
    $.ajax({
        url: "news",
        success: 
        function(result){
            var string = ""
            console.log(result)
            for (const element of result) { 
                //string.concat(element.destinationDisplay.frontText)
                //console.log(element.destinationDisplay.frontText);
                

                //var depTime = diffHrs
                string += `${element}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp`
            }
            console.log(string)
            $('#news').html(string); //insert text of test.php into your div
            //console.log(result.data.stopPlace.estimatedCalls[0].destinationDisplay.frontText)
            setTimeout(function(){
                news(); //this will send request again and again;
            }, 10000);
        }
    });
}