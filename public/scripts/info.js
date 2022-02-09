// Create function
function info(){
    // Create ajax request
    $.ajax({
        url: "info",
        success: 
        function(result){
            // Get infobox from Tavla
            element = document.getElementById('infobox');
            innerhtml = element.innerHTML
            if(element.innerHTML === result.message){
                // If nothing is changed, do not update
                console.log("No Update")
            }else if(innerhtml.includes('<script>image_gallery()</script>')){
                // IF image scroller, no update
                console.log("No Update")
            }else{
                // Update mage
                console.log("Update")
                $('#infobox').html(result.message);
            }
            
            // Repeat function
            setTimeout(function(){
                info();
            }, 10000);
        }
    });
}