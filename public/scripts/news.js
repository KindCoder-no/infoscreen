// Create function
function news(){
    // Create ajax request
    $.ajax({
        url: "news",
        success: 
        function(result){
            // Define string for data inpit
            var string = ""
            
            // For each element
            result.forEach(function(element){
              if(result[result.length-1] === element){
                // If news is the last in array
                string += element
              }else{
                // Add space after each message
                string += element + "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp"
              }
            })

            
            if($('#news').html() === string){
                console.log("No update news")
            }else{
                console.log("Update news")
                // Update data on tavla
                $('#news').html(string); 
                /*jQuery(document).ready(function($) {
                    var promoticker = function() {
                      var window_width = window.innerWidth;
                      var speed = 15 * window_width;
                      $('#promo-notifications li:first').animate( {left: '-980px'}, speed, 'linear', function() {
                        $(this).detach().appendTo('#promo-notifications ul').css('left', "100%");
                        promoticker();
                      });
                    };
                    if ($("#promo-notifications li").length > 1) {
                      promoticker();
                    }
                  });*/
            }

            

            // Repeat every second
            setTimeout(function(){
                news();
            }, 100000);
        }
    });
}