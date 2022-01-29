function chantina(){
    $.ajax({
        url: "chantina",
        success: 
        function(result){
            var idag = result.today + result.todayprice
            
            var matkalender = ""

            var matkalenderArray = result.matkalender
            matkalenderArray.forEach(function(element, index){
                var dager = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"]
                var matkalenderpriserArray = result.matkalenderprices

                matkalender += 
                `<div class="row">
                    <div class="col">
                    ${dager[index]}:
                    </div>
                    <div class="col-7">
                    ${element} ${matkalenderpriserArray[index]}
                    </div>
                </div>`
            })
            $('#matkalender').html(matkalender);
            $('#dagensmat').html(idag); //insert text of test.php into your div
            //console.log(result.data.stopPlace.estimatedCalls[0].destinationDisplay.frontText)
            setTimeout(function(){
                chantina(); //this will send request again and again;
            }, 300000);
        }
    });
}