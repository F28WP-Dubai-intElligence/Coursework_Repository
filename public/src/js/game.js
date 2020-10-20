function init() {
    myTime = null;

    ship = document.getElementById("ship");

    ship_place = document.getElementById("ship_location");

    board = document.getElementById("board");
    boardHeight = board.offsetHeight;;
    boardWidth = board.offsetWidth;;


    X_MAX = board.offsetLeft + boardWidth - 60;
    X_MIN = board.offsetLeft;
    Y_MIN = board.offsetTop;
    Y_MAX = board.offsetTop + 0.9 * boardHeight;

    ship_X_STEP = 10;
    ship_Y_STEP = 10;
    X_ship_Direction = 1;
    Y_ship_Direction = 1;

    ship_Move_X = 0;
    ship_Move_Y = 0;


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

    //wait for next key press to move ship
    ship_Move_X = 0;
    ship_Move_Y = 0;

    setNewPosition(ship, dx_ship, dy_ship);


    myTime = setTimeout('gameLoop()', 10);

    ship_place.innerHTML = "x: " + ship.offsetLeft + "  y: " + ship.offsetTop;


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

    //init directions and mouvement
    ship_Direction = 1;

    ship_Move_X = 0;
    ship_Move_Y = 0;


    clearTimeout(myTime);


    //calculate initial ship position
    let ship_X_INIT = board.offsetLeft + 0.5 * boardWidth;
    let ship_Y_INIT = board.offsetTop + 0.9 * boardHeight;

    //set initial positions
    ship.style.left = ship_X_INIT + "px";
    ship.style.top = ship_Y_INIT + "px";
    //init position display
    ship_place.innerHTML = "...";


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
    if (y_element < Y_MIN) x_element = Y_MIN;
    // Store positions	
    element.style.left = x_element + "px";
    element.style.top = y_element + "px";

}