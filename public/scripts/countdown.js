// Create function
function countdown(){
    // Get todays date
    var today = new Date()

    // Vinterferie
    var vinterferieDate = new Date("2022", "1", "18", "15", "40");

    // Untill Ferie
    var vinterferie_timeleft = vinterferieDate - today;

    // Format days, hours and seconds
    var vinterferie_days = Math.floor(vinterferie_timeleft / (1000 * 60 * 60 * 24));
    var vinterferie_hours = Math.floor((vinterferie_timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var vinterferie_minutes = Math.floor((vinterferie_timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var vinterferie_seconds = Math.floor((vinterferie_timeleft % (1000 * 60)) / 1000);
    
    // Format display
    if(today > vinterferieDate){
        var vinterferie_update = "FERIE!!!"
    }else{
        if(vinterferie_days < 1){
            if(vinterferie_hours < 1){
                if(vinterferie_minutes < 1){
                    var vinterferie_update = vinterferie_seconds + " Sek"
                }else{
                    var vinterferie_update = vinterferie_minutes + " Min " + vinterferie_seconds + " Sek"
                }
            }else{
                var vinterferie_update = vinterferie_hours + " Timer " + vinterferie_minutes + " Min " + vinterferie_seconds + " Sek"
            }
        }else{
            if(vinterferie_hours < 1){
                var vinterferie_update = vinterferie_days + " Dager " + vinterferie_minutes + " Min " + vinterferie_seconds + " Sek"
            }else{
                var vinterferie_update = vinterferie_days + " Dager " + vinterferie_hours + " Timer " + vinterferie_minutes + " Min " + vinterferie_seconds + " Sek"
            }
        }
    }

    // Påskeferie
    var paaskeferieDate = new Date("2022", "3", "08", "15", "40");

    // Untill Ferie
    var paaskeferie_timeleft = paaskeferieDate - today;

    // Format days, hours and seconds
    var paaskeferie_days = Math.floor(paaskeferie_timeleft / (1000 * 60 * 60 * 24));
    var paaskeferie_hours = Math.floor((paaskeferie_timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var paaskeferie_minutes = Math.floor((paaskeferie_timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var paaskeferie_seconds = Math.floor((paaskeferie_timeleft % (1000 * 60)) / 1000);

    // Format display
    if(today > paaskeferieDate){
        var paaskeferie_update = "FERIE!!!"
    }else{
        if(paaskeferie_days < 1){
            if(paaskeferie_hours < 1){
                if(paaskeferie_minutes < 1){
                    var paaskeferie_update = paaskeferie_seconds + " Sek"
                }else{
                    var paaskeferie_update = paaskeferie_minutes + " Min " + paaskeferie_seconds + " Sek"
                }
            }else{
                var paaskeferie_update = paaskeferie_hours + " Timer " + paaskeferie_minutes + " Min " + paaskeferie_seconds + " Sek"
            }
        }else{
            if(paaskeferie_hours < 1){
                var paaskeferie_update = paaskeferie_days + " Dager " + paaskeferie_minutes + " Min " + paaskeferie_seconds + " Sek"
            }else{
                var paaskeferie_update = paaskeferie_days + " Dager " + paaskeferie_hours + " Timer " + paaskeferie_minutes + " Min " + paaskeferie_seconds + " Sek"
            }
        }
    }

    // Sommerferie
    var sommerferieDate = new Date("2022", "5", "21", "15", "40");

    // Untill Ferie
    var sommerferie_timeleft = sommerferieDate - today;

    // Format days, hours and seconds
    var sommerferie_days = Math.floor(sommerferie_timeleft / (1000 * 60 * 60 * 24));
    var sommerferie_hours = Math.floor((sommerferie_timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var sommerferie_minutes = Math.floor((sommerferie_timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var sommerferie_seconds = Math.floor((sommerferie_timeleft % (1000 * 60)) / 1000);

    // Format display
    if(today > sommerferieDate){
        var sommerferie_update = "FERIE!!!"
    }else{
        if(sommerferie_days < 1){
            if(sommerferie_hours < 1){
                if(sommerferie_minutes < 1){
                    var sommerferie_update = sommerferie_seconds + " Sek"
                }else{
                    var sommerferie_update = sommerferie_minutes + " Min " + sommerferie_seconds + " Sek"
                }
            }else{
                var sommerferie_update = sommerferie_hours + " Timer " + sommerferie_minutes + " Min " + sommerferie_seconds + " Sek"
            }
        }else{
            if(sommerferie_hours < 1){
                var sommerferie_update = sommerferie_days + " Dager " + sommerferie_hours + " Min " + sommerferie_seconds + " Sek"
            }else{
                var sommerferie_update = sommerferie_days + " Dager " + sommerferie_hours + " Timer " + sommerferie_minutes + " Min " + sommerferie_seconds + " Sek"
            }
        }
    }

    // Update Tavla
    $('#vinterferie_countdown').text(vinterferie_update);
    $('#paaskeferie_countdown').text(paaskeferie_update);
    $('#sommerferie_countdown').text(sommerferie_update);

    // Repeat every 100 milisecond
    setTimeout(function(){
        countdown(); 
    }, 100);
}