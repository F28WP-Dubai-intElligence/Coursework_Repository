function init() {
    myTime = null;

    ship = document.getElementById("ship");
    rock = document.getElementById("rock");

    ship_place = document.getElementById("ship_location");
    rock_place = document.getElementById("rock_location");
    hits = document.getElementById("hits");
    duration = document.getElementById("duration");

    board = document.getElementById("banner");
    boardHeight = board.offsetHeight;;
    boardWidth = board.offsetWidth;;


    X_MAX = board.offsetLeft + boardWidth - 60;
    X_MIN = board.offsetLeft;
    Y_MIN = board.offsetTop;
    Y_MAX = board.offsetTop + 0.9 * boardHeight;

    ship_X_STEP = 10;
    ship_Y_STEP = 10;
    rock_X_STEP = 2;
    rock_Y_STEP = 1;

    X_ship_Direction = 1;
    Y_ship_Direction = 1;
    X_rock_Direction = 1;
    Y_rock_Direction = 1;

    ship_Move_X = 0;
    ship_Move_Y = 0;
    rock_Move = 1;


    KEYUP = 38;
    KEYDOWN = 40;
    KEYLEFT = 37;
    KEYRIGHT = 39;
}

function gameLoop() // update loop for game
{

    // change in offset for ship and wolf
    let dy_ship = Y_ship_Direction * ship_Move_Y * ship_Y_STEP;
    let dx_ship = X_ship_Direction * ship_Move_X * ship_X_STEP;
    let dy_rock = Y_rock_Direction * rock_Move * rock_Y_STEP;
    let dx_rock = X_rock_Direction * rock_Move * rock_X_STEP;

    //wait for next key press to move ship
    ship_Move_X = 0;
    ship_Move_Y = 0;

    setNewPosition(ship, dx_ship, dy_ship);
    setNewPosition(rock, dx_rock, dy_rock);

    myTime = setTimeout('gameLoop()', 10);

    ship_place.innerHTML = "x: " + ship.offsetLeft + "  y: " + ship.offsetTop;
    rock_place.innerHTML = "x: " + rock.offsetLeft + "  y: " + rock.offsetTop;

    if (cross(rock, ship)) {
        let thisDuration = new Date() - startTime;
        restart();
        let score = hits.innerHTML;
        score = Number(score) + 1;
        hits.innerHTML = score;
        //window.log("Game Over!");
        let currentDuration = duration.innerHTML;
        if (currentDuration !== "?") {
            currentDuration = Number(duration.innerHTML);
            if (thisDuration < currentDuration) thisDuration = currentDuration;
        }
        document.getElementById("duration").innerHTML = thisDuration;
    }

}

// when key is pressed  (user input)
function keyDownHandler(e) {


    if (e.keyCode == KEYRIGHT) {
        X_ship_Direction = 1;
        ship_Move_X = 1;
    } // right key
    if (e.keyCode == KEYLEFT) {
        X_ship_Direction = -1;
        ship_Move_X = 1;
    } // left key

    if (e.keyCode == KEYUP) {
        Y_ship_Direction = -1;
        ship_Move_Y = 1;
    } // up key
    if (e.keyCode == KEYDOWN) {
        Y_ship_Direction = 1;
        ship_Move_Y = 1;
    } // up key
    switch (e.keyCode) {
        case 37:
        case 39:
        case 38:
        case 40: // Arrow keys
        case 32:
            e.preventDefault();
            break; // Space
        default:
            break; // do not block other keys
    }

};


function restart() {
    startTime = new Date();

    //init directions and movement
    ship_Direction = 1;
    rock_Direction = 1;

    ship_Move_X = 0;
    ship_Move_Y = 0;
    rock_Move = 1;


    clearTimeout(myTime);


    //calculate initial ship position
    let ship_X_INIT = board.offsetLeft + 0.5 * boardWidth;
    let ship_Y_INIT = board.offsetTop + 0.9 * boardHeight;
    let coef = Math.random();
    let rock_X_INIT = board.offsetLeft + coef * boardWidth;
    coef = Math.random();
    let rock_Y_INIT = board.offsetTop + coef * boardHeight;

    //set initial positions
    ship.style.left = ship_X_INIT + "px";
    ship.style.top = ship_Y_INIT + "px";
    rock.style.left = rock_X_INIT + "px";
    rock.style.top = rock_Y_INIT + "px";
    //init position display
    ship_place.innerHTML = "...";
    rock_place.innerHTML = "...";


    // Add an event listener to the keypress event.
    document.addEventListener("keydown", keyDownHandler, false);

    gameLoop();
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
    if (y_element >= Y_MAX) {
        y_element = Y_MAX;
    }
    if (y_element <= Y_MIN) {
        y_element = Y_MIN;
    }
    if (x_element >= X_MAX && element == rock) {
        X_rock_Direction = -1;

    }
    if (x_element <= X_MIN && element == rock) {
        X_rock_Direction = 1;
    }
    if (y_element >= Y_MAX && element == rock) {
        Y_rock_Direction = -1;

    }
    if (y_element <= Y_MIN && element == rock) {
        Y_rock_Direction = 1;
    }
    if (y_element < Y_MIN) x_element = Y_MIN;
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