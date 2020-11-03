function init() {
    noOfPlayers = 1;
    playerID = 0;
    latestPlayer = 0;

    rockMinSpeed = 7;
    rockMaxSpeed = 15;

    myTime = null;

    rockData = [];

    noOfRocks = 20;

    board = document.getElementById("board");

    rocks = document.querySelectorAll(".rocks");

    // rocks[1] = document.querySelectorAll(".rock2");
    ships = document.querySelectorAll(".ship");

    ships.forEach(ship => {
        ship.style.left = -9999 + 'px';
        ship.style.top = 9999 + 'px';
        ship.style.position = "absolute";
    })


    ship_place = document.getElementById("ship_location");
    rock_place = document.getElementById("rock_location");
    score = document.getElementById("score");
    duration = document.getElementById("duration");


    boardHeight = board.offsetHeight;
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

    shipInit();

    addRocks();

}

function refresh() {
    location.reload();
}


function gameLoop() // update loop for game
{
    // change in offset for ship
    let dy_ship = Y_ship_Direction * ship_Move_Y * ship_Y_STEP;
    let dx_ship = X_ship_Direction * ship_Move_X * ship_X_STEP;

    //wait for next key press to move ship
    ship_Move_X = 0;
    ship_Move_Y = 0;

    if (playerID + 1 <= noOfPlayers) {
        setNewPosition(ships[playerID], dx_ship, dy_ship);
    }

    myTime = setTimeout('gameLoop()', 10);

    // ship_place.innerHTML = "x: " + ship.offsetLeft + "  y: " + ship.offsetTop;

    keyHandler();
    rocks.forEach(rock => {
        if (cross(rock, ships[playerID])) {
            // rockID = 0;
            restart();
            let shipScore = score.innerHTML;
            shipScore = Number(shipScore) - 1;
            console.log(shipScore);
            score.innerHTML = shipScore;
        }

    });


    if (ships[playerID].offsetTop <= Y_MIN) {
        restart();
        let shipScore = score.innerHTML;
        shipScore = Number(shipScore) + 1;
        console.log(shipScore);
        score.innerHTML = shipScore;
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

    ship_Direction = 1;

    ship_Move_X = 0;
    ship_Move_Y = 0;

    shipInit();


    // Add an event listener to the keypress event.

    document.addEventListener('keydown', keyDOWN, true);
    document.addEventListener('keyup', keyUP, true);

    gameLoop();
    initBarCount();
    initBarCount2();


}

function addPlayer() {
    latestPlayer++;
    noOfPlayers++;
    // updateBoards();
    // removeRocks();
    // addRocks();
    shipInit(latestPlayer);
    timerPosUpdate();
}

// function updateBoards() {
//     let boardScreens = boardWidth / noOfPlayers;
//     let leftbound = 0;
//     let i = 0;
//     while (i < noOfPlayers) {
//         max_x = leftbound + boardScreens;
//         min_x = leftbound;
//         min_y = board.offsetTop;
//         max_y = board.offsetTop + 0.9 * boardHeight;
//         boardDivisions[i] = { X_MAX: max_x, X_MIN: min_x, Y_MIN: min_y, Y_MAX: max_y };
//         leftbound += boardScreens;
//         i++;
//     }

// }