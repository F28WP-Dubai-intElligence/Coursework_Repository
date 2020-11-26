// THIS IS THE JAVASCRIPT FILE FOR FUNCTIONS RELATED TO THE TIMERS IN THE GAME

// IT IMPLEMENTS THE FOLLOWING:
// 1. a global clock for the game
// 2. controls the timer bar operaions


// the main function that starts the game timers and invokes functions at the required times
function startClocks() {
    setTimeout(warningSound, 52500);
    setTimeout(timedOut, 60000);
}

// function that is invoked 8 seconds before the game is over to play a warning sound
function warningSound() {
    prewarn.play();

}

// function that is invoked when the timer runs out and the game is over
function timedOut() {
    setCookie("score", score.innerHTML, 30);
    window.location.replace('gameover.html');

}

// function that keeps a track of the seconds remaining for the timer bar functionality
function countdown() {
    function tick() {
        // var counter = document.getElementById("counter");
        secondsRemaining--;
        // counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
        setTimeout(tick, 1000);
    }
    tick();
}

// function that intializes the timer bar
function initBarCount() {
    var mytimeleft = document.getElementById("mytimeleft");
    var divcountdown = document.getElementById("divcountdown");
    var startTimer = setInterval(barCount, 78);

    function barCount() {
        if (mytimeleft.clientWidth < divcountdown.clientWidth) {
            mytimeleft.style.width = mytimeleft.clientWidth + 1 + "px";
        } else {
            mytimeleft.style.width = mytimeleft.clientWidth + "px";
            clearInterval(startTimer);
        }

    }
}