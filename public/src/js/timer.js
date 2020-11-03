function timedOut() {
    alert("GAME OVER!!");
}

// set a timer
setTimeout(timedOut, 60000);
/*function countdown() {
    var seconds = 60;
    function tick() {
        var counter = document.getElementById("counter");
        seconds--;
        counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            alert("Game over");
        }
    }
    tick();
}
*/
function initBarCount() {
    var mytimeleft = document.getElementById("mytimeleft");
    var divcountdown = document.getElementById("divcountdown");
    var startTimer = setInterval(barCount, 74);

    function barCount() {
        if (mytimeleft.clientWidth < divcountdown.clientWidth) {
            mytimeleft.style.width = mytimeleft.clientWidth + 1 + "px";
        } else {
            mytimeleft.style.width = mytimeleft.clientWidth + "px";
            clearInterval(startTimer);
        }

    }
}

function extra() {
    refresh();
    restart();

}