function timedOut() {
    window.location.replace('gameover.html');
    rocks.forEach(rock => {
        rock.remove()
    })

}


// set a timer
setTimeout(timedOut, 60000);
// setTimeout(function() {
//     trial.style.visibility = "visible";
//     trial.style.display = "block";
// }, 60000);

function countdown() {
    function tick() {
        // var counter = document.getElementById("counter");
        secondsRemaining--;
        // counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
        setTimeout(tick, 1000);
    }
    tick();
}

function initBarCount() {
    var mytimeleft = document.getElementById("mytimeleft");
    var divcountdown = document.getElementById("divcountdown");
    var startTimer = setInterval(barCount, 71);

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