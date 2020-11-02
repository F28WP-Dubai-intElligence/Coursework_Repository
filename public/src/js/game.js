function init() {

    myTime = null;

    data = [];

    noOfRocks = 20;

    ship = document.querySelector("#ship");
    rocks = document.querySelectorAll(".rock");


    ship_place = document.getElementById("ship_location");
    rock_place = document.getElementById("rock_location");
    score = document.getElementById("score");
    duration = document.getElementById("duration");

    board = document.getElementById("board");
    boardHeight = board.offsetHeight;;
    boardWidth = board.offsetWidth;;


    X_MAX = board.offsetLeft + boardWidth - 60;
    X_MIN = board.offsetLeft;
    Y_MIN = board.offsetTop;
    Y_MAX = board.offsetTop + 0.9 * boardHeight;

    //velocity of the ship
    ship_X_STEP = 3;
    ship_Y_STEP = 3;


    X_ship_Direction = 1;
    Y_ship_Direction = 1;

    ship_Move_X = 0;
    ship_Move_Y = 0;

    KEYUP = 38;
    KEYDOWN = 40;
    KEYLEFT = 37;
    KEYRIGHT = 39;

    rockID = 0;

    addRocks();
}

function refresh() {
    location.reload();
}

function randomleft() {
    var x = Math.floor((Math.random() * X_MAX));
    return x;
}

function randomtop() {
    var x = Math.floor(((Y_MIN + 10) + (Math.random() * (Y_MAX - Y_MIN))));
    return x;
}

function randomvel() {
    var random = [];
    min = Math.ceil(15);
    max = Math.floor(7);
    random[0] = Math.floor(Math.random() * (max - min + 1) + min);
    random[1] = Math.floor(Math.random() * ((-1 * max) - (-1 * min) + 1) + (-1 * min));
    posorneg = Math.floor(Math.random() * ((Math.floor(1)) - 0 + 1) + 0);
    // console.log(random[posorneg]);
    return random[posorneg];
}

function Rock(rockpic, left, top, vx, vy) {
    this.element = rockpic;
    this.x = left;
    this.y = top;
    this.dx = vx;
    this.dy = vy;

    var move;
    var that = this;
    this.initr = function() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.updatePositive();
    }

    this.updatePositive = function() {
        move = setInterval(frame, 100);

        function frame() {
            //meteor boundaries
            if (that.x >= X_MAX || that.x <= X_MIN) {
                that.dx = that.dx * -1;
            }
            if (that.y >= Y_MAX - 50 || that.y <= Y_MIN + 10) {
                that.dy *= -1;
            }
            that.x = that.x + that.dx;
            that.y = that.y + that.dy;
            that.element.style.left = that.x + 'px';
            that.element.style.top = that.y + 'px';
        }
    }
}

function gameLoop() // update loop for game
{

    // console.log(data);
    // change in offset for ship
    let dy_ship = Y_ship_Direction * ship_Move_Y * ship_Y_STEP;
    let dx_ship = X_ship_Direction * ship_Move_X * ship_X_STEP;

    //wait for next key press to move ship
    ship_Move_X = 0;
    ship_Move_Y = 0;

    console.log(ship_Move_X);

    setNewPosition(ship, dx_ship, dy_ship);

    myTime = setTimeout('gameLoop()', 10);

    ship_place.innerHTML = "x: " + ship.offsetLeft + "  y: " + ship.offsetTop;

    keyHandler();
    rocks.forEach(rock => {
        if (cross(rock, ship)) {
            rockID = 0;
            restart();

        }
    });

    if (ship.offsetTop == Y_MIN) {
        let shipScore = score.innerHTML;
        shipScore = Number(shipScore) + 1;
        score.innerHTML = shipScore;
        restart();
    }


    // console.log(keyState);
}

function keyHandler() {
    if (keyState[KEYRIGHT]) {
        X_ship_Direction = 1;
        ship_Move_X = 1;
    } // right key
    if (keyState[KEYLEFT]) {
        X_ship_Direction = -1;
        ship_Move_X = 1;
    } // left key

    if (keyState[KEYUP]) {
        Y_ship_Direction = -1;
        ship_Move_Y = 1;
    } // up key
    if (keyState[KEYDOWN]) {
        Y_ship_Direction = 1;
        ship_Move_Y = 1;
    } // up key
}

function keyDOWN(e) {
    keyState[e.keyCode] = true;
}

function keyUP(e) {
    keyState[e.keyCode] = false;
}

function addRocks() {
    rocks.forEach(rock => {
        // console.log(rockID);
        data[rockID] = { top: randomtop(), left: randomleft(), xvel: randomvel(), yvel: randomvel() };
        var rock1 = new Rock(rock, data[rockID].left, data[rockID].top, data[rockID].xvel, data[rockID].yvel);
        rock1.initr();
        // console.log(data[rockID]);
        rockID++;
    });
}

function setNewPosition(element, dx, dy) {

    // Get current positions
    let x_element = element.offsetLeft;
    let y_element = element.offsetTop;

    x_element = x_element + dx;
    y_element = y_element + dy;

    //keep within board
    if (x_element >= X_MAX) x_element = X_MAX;
    if (x_element <= X_MIN) x_element = X_MIN;
    if (y_element >= Y_MAX) y_element = Y_MAX;
    if (y_element <= Y_MIN) y_element = Y_MIN;
    // Store positions
    element.style.left = x_element + "px";
    element.style.top = y_element + "px";

}

function cross(element1, element2) {
    e1Left = element1.offsetLeft; //i1x
    e1Top = element1.offsetTop; //i1y
    e1Right = element1.offsetLeft + element1.offsetWidth; //r1x
    e1Bottom = element1.offsetTop + element1.offsetHeight; //r1y

    e2Left = element2.offsetLeft; //i2x
    e2Top = element2.offsetTop; //i2y
    e2Right = element2.offsetLeft + element2.offsetWidth; //r2x
    e2Bottom = element2.offsetTop + element2.offsetHeight; //r2y

    x_overlap = Math.max(0, Math.min(e1Right, e2Right) - Math.max(e1Left, e2Left));
    y_overlap = Math.max(0, Math.min(e1Bottom, e2Bottom) - Math.max(e1Top, e2Top));
    overlapArea = x_overlap * y_overlap;

    if (overlapArea == 0) return false;
    return true;

}

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

function restart() {
    // startTime = new Date();
    //init directions and movement

    clearTimeout(myTime);

    ship_Direction = 1;

    ship_Move_X = 0;
    ship_Move_Y = 0;

    //calculate initial ship position
    let ship_X_INIT = board.offsetLeft + (0.5 * boardWidth);
    let ship_Y_INIT = board.offsetTop + (0.9 * boardHeight);

    //set initial positions
    ship.style.left = ship_X_INIT + "px";
    ship.style.top = ship_Y_INIT + "px";


    // Add an event listener to the keypress event.

    document.addEventListener('keydown', keyDOWN, true);
    document.addEventListener('keyup', keyUP, true);

    gameLoop();



}