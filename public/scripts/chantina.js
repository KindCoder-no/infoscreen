// Create Function
function chantina() {
    // Create ajax call
    $.ajax({
        url: "chantina",
        success: 
        function(result){
            // Create Today String
            var idag = "Dagens: " + result.today.Matrett +  " " + result.today.Pris
            
            // Create Matkalender String
            var matkalender = ""

            var matkalenderArray = result.matkalender
            matkalenderArray.forEach(function(element, index){
                // Define days
                var dager = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag"]
                
                // Add element for each day
                matkalender += `
                <tr>
                    <th scope="row">${dager[index]}</th>
                    <td>${element.Matrett} ${element.Pris}</td> 
                </tr>`
            })

            // Update HTML on Tavla
            $('#matkalender').html(matkalender);
            $('#dagensmat').html(idag); 

            // Repeat function every 300000 milisecond
            setTimeout(function(){
                chantina(); 
            }, 300000);
        }
    });
}