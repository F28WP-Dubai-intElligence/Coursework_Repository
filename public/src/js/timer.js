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

function initBarCount2() {
    var mytimeleft2 = document.getElementById("mytimeleft2");
    var divcountdown2 = document.getElementById("divcountdown2");
    var startTimer = setInterval(barCount, 71);

    function barCount() {
        if (mytimeleft2.clientWidth < divcountdown2.clientWidth) {
            mytimeleft2.style.width = mytimeleft2.clientWidth + 1 + "px";
        } else {
            mytimeleft2.style.width = mytimeleft2.clientWidth + "px";
            clearInterval(startTimer);
        }

    }
}


function extra() {
    refresh();
    restart();

}

function timerPosUpdate() {
    console.log("players: " + noOfPlayers)
    var divcountdown = document.getElementById("divcountdown");

    if (noOfPlayers >= 2) {
        // divcountdown.style.transform = "rotate(-90deg)";
        divcountdown.style.left = '25%';


        if (noOfPlayers == 3) {
            var divcountdown2 = document.getElementById("divcountdown2");
            divcountdown2.style.visibility = 'visible';
            divcountdown.style.left = '8.33%';
            divcountdown2.style.left = '41.67%';
            // mytimeleft2.style.left = '20%';


        }
        // Append the newly created element on element p 

    }
}