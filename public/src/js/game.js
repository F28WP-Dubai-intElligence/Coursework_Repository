function init() {

    noOfPlayers = 1;
    playerID = 0;

    myTime = null;

    rockData = [];

    noOfRocks = 20;

    rocks = document.querySelectorAll(".rock");
    ship1 = document.getElementById("ship1");


    ship1_place = document.getElementById("ship1_location");
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
    ship1_X_STEP = 3;
    ship1_Y_STEP = 3;


    X_ship1_Direction = 1;
    Y_ship1_Direction = 1;

    ship1_Move_X = 0;
    ship1_Move_Y = 0;

    KEYUP = 38;
    KEYDOWN = 40;
    KEYLEFT = 37;
    KEYRIGHT = 39;

    rockID = 0;

    shipInit();

    addRocks();

}

function refresh() {
    location.reload();
}


function gameLoop() // update loop for game
{
    // change in offset for ship
    let dy_ship1 = Y_ship1_Direction * ship1_Move_Y * ship1_Y_STEP;
    let dx_ship1 = X_ship1_Direction * ship1_Move_X * ship1_X_STEP;

    //wait for next key press to move ship
    ship1_Move_X = 0;
    ship1_Move_Y = 0;


    setNewPosition(ship1, dx_ship1, dy_ship1);
    myTime = setTimeout('gameLoop()', 10);

    // ship_place.innerHTML = "x: " + ship.offsetLeft + "  y: " + ship.offsetTop;

    keyHandler();
    rocks.forEach(rock => {
        if (cross(rock, ship1)) {
            rockID = 0;
            restart();
        }

    });


    if (ship1.offsetTop == Y_MIN) {
        restart();
        let ship1Score = score.innerHTML;
        ship1Score = Number(ship1Score) + 1;
        console.log(data)
        score.innerHTML = ship1Score;
    }

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

function restart() {
    // startTime = new Date();
    //init directions and movement

    clearTimeout(myTime);

    ship1_Direction = 1;

    ship1_Move_X = 0;
    ship1_Move_Y = 0;

    shipInit();


    // Add an event listener to the keypress event.

    document.addEventListener('keydown', keyDOWN, true);
    document.addEventListener('keyup', keyUP, true);

    gameLoop();

}

function addPlayer() {
    noOfPlayers++;
    playerID++;
    shipInit();
}