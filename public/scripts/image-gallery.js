// Create function
function image_gallery(){
    // Create ajax request
    $.ajax({
        url: "image-gallery",
        success: 
        function(result){
            // Define string for data inpit
            var string = ""
            
            // For each element
            result.forEach(function(element){
              
                string += `<div style="display: inline-block;">
                <img src="${element.image_link}" height="400">
                <p style="text-align: center; color: white; font-size: 150%;">${element.author}</p>
            </div>&nbsp; &nbsp; &nbsp;`              
            })

            
            if($('#image_gallery').html() === string){
                console.log("No update news")
            }else{
                console.log("Update news")
                // Update data on tavla
                $('#image_gallery').html(string + "&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;"); 
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
                image_gallery();
            }, 100000);
        }
    });
}