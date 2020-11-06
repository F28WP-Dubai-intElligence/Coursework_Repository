function init() {
    noOfPlayers = 1;
    playerID = 0;
    latestPlayer = 0;

    secondsRemaining = 60;

    rockMinSpeed = 7;
    rockMaxSpeed = 15;

    spot = 0;

    spotFade = 0;

    myTime = null;

    rockData = [];

    meteorData = [];

    noOfRocks = 20;

    blast = document.getElementById("blast");

    warning = document.getElementById("warning");

    board = document.getElementById("board");

    rocks = document.querySelectorAll(".rocks");

    meteors = document.querySelectorAll(".meteor");

    spotScore = document.getElementById("spotScore");
    // rocks[1] = document.querySelectorAll(".rock2");
    ships = document.querySelectorAll(".ship");

    countdown();

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
    meteorID = 0;

    shipInit();

    addRocks();

    callStrike();

    strikeWarning();
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

        if (cross(rock, ships[playerID]) && rock.style.visibility == "visible") {
            // rockID = 0;
            rock.style.visibility = "hidden";
            showBlast(ships[playerID].offsetTop, ships[playerID].offsetLeft);
            spotPoint(ships[playerID].offsetTop, ships[playerID].offsetLeft, -1, "red");
            restart();
            let shipScore = score.innerHTML;
            shipScore = Number(shipScore) - 1;
            // console.log(shipScore);
            score.innerHTML = shipScore;
        }
    });

    meteors.forEach(meteoroid => {
        if (cross(meteoroid, ships[playerID])) {
            // rockID = 0;
            showBlast(ships[playerID].offsetTop, ships[playerID].offsetLeft);
            spotPoint(ships[playerID].offsetTop, ships[playerID].offsetLeft, -5, "red");
            restart();
            let shipScore = score.innerHTML;
            shipScore = Number(shipScore) - 5;
            score.innerHTML = shipScore;
        }
    });


    if (ships[playerID].offsetTop <= Y_MIN) {
        spotPoint(ships[playerID].offsetTop, ships[playerID].offsetLeft, "+" + 5, "green");
        restart();
        let shipScore = score.innerHTML;
        shipScore = Number(shipScore) + 5;
        console.log(shipScore);
        score.innerHTML = shipScore;
    }
}

function showBlast(y, x) {
    console.log("blast" + x, y);
    blast.style.visibility = "visible";
    blast.style.top = y + 'px';
    blast.style.left = x + 'px';
    setTimeout(function() {
        blast.style.visibility = "hidden";
    }, 900);
}

function spotPoint(y, x, p, c) {
    console.log("points" + x, y);
    if (spotFade != 0) {
        clearInterval(timerId);
    }
    spotScore.innerHTML = p;
    spotScore.style.color = c;
    spotScore.style.opacity = 1;
    opacity = 1;
    spotScore.style.visibility = "visible";
    spotScore.style.top = y + 'px';
    spotScore.style.left = x + 'px';
    hideScore()
    spot++;

    function hideScore() {
        setTimeout(function() { // start a delay
            spotScore.style.opacity = 1;
            spotFade++;
            timerId = setInterval(function() {
                opacity = spotScore.style.opacity;
                if (opacity == 0) {
                    clearInterval(timerId);
                    spotFade = 0;
                } else {
                    spotScore.style.opacity = opacity - 0.05;
                }
            }, 100);
        }, 500);
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
    if (noOfPlayers == 3) {
        window.alert("Max 3 Players only!");
    } else {
        latestPlayer++;
        noOfPlayers++;
        // updateBoards();
        // removeRocks();
        // addRocks();
        shipInit(latestPlayer);
        timerPosUpdate();
    }
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