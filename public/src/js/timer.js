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
function move(delay) {
    var elem = document.getElementById("myBar");
    var end = Date.now() + delay;
    var frame = () => {
        var timeleft = Math.max(0, end - Date.now());
        elem.style.width = (100 * timeleft) / delay + '%';
        elem.innerHTML = (timeleft / 1000).toFixed(1) + 's';
        if (timeleft === 0) return;
        requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
}

function extra() {
    restart();
    move(60000);

}