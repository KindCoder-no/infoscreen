function clock() {
    var today = new Date();

    if(today.getMinutes() < 10){
        var minutes = "0" + today.getMinutes()
    }else{
        var minutes = today.getMinutes()
    }

    if(today.getSeconds() < 10){
        var seconds = "0" + today.getSeconds()
    }else{
        var seconds = today.getSeconds()
    }
    var nowclock = today.getHours() + ":" + minutes
    $('#clock').text(nowclock)
    setTimeout(function(){
        clock();
    }, 100);
}