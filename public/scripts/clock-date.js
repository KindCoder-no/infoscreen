// Create Function
function clock_date() {
    // Get Todays date
    var today = new Date();

    // If Hours is under 10/9, add a 0 before
    if(today.getHours() < 10){
        var hour = "0" + today.getHours()
    }else{
        var hour = today.getHours()
    }

    // If Minutes is under 10/9, add a 0 before
    if(today.getMinutes() < 10){
        var minutes = "0" + today.getMinutes()
    }else{
        var minutes = today.getMinutes()
    }

    // If Seconds is under 10/9, add a 0 before
    if(today.getSeconds() < 10){
        var seconds = "0" + today.getSeconds()
    }else{
        var seconds = today.getSeconds()
    }

    // Define Clock
    var nowclock = hour + ":" + minutes + ":" + seconds

    // Define Months
    var maaneder = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]

    // Set Clock and date on tavla
    $('#clock').text(nowclock)
    $('#date').text(today.getDate() + " " + maaneder[today.getMonth()] + " " + today.getFullYear())

    // Repeat function every 100 miliseconds
    setTimeout(function(){
        clock_date();
    }, 100);
}