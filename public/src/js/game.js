function init() {
    myTime = null;

    data = [];

    ship = document.querySelector("#ship");

    ship_place = document.getElementById("ship_location");
    rock_place = document.getElementById("rock_location");
    hits = document.getElementById("hits");
    duration = document.getElementById("duration");

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

    refresh = 0;


}

function randomleft() {
    var x = Math.floor((Math.random() * X_MAX));
    return x;
}

function randomtop() {
    var x = Math.floor((Y_MIN + (Math.random() * boardHeight)));
    return x;
}

function randomvel() {
    var x = Math.floor((Math.random() * 16) - 8);
    return x;
}

function Rock(rockbody, left, top, vx, vy) {
    this.element = rockbody;
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
            if (that.x >= X_MAX || that.x <= X_MIN) {
                that.dx = that.dx * -1;
            }
            if (that.y >= Y_MAX || that.y <= Y_MIN + 10) {
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
        console.log("KEY");
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
    if (refresh == 0) {
        refresh++;
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
        rock_place.innerHTML = "...";


        for (var i = 0; i < 20; i++) {
            data.push({ top: randomtop(), left: randomleft(), xvel: randomvel(), yvel: randomvel() });
            var box = document.createElement('div');
            box.style.width = '50px';
            box.style.height = '44px';
            box.style.backgroundImage = "url('public/src/assets/images/meteor1.png')";
            box.style.backgroundRepeat = 'no-repeat';
            box.style.position = 'absolute';
            var rock = new Rock(box, data[i].left, data[i].top, data[i].xvel, data[i].yvel);
            rock.initr();
            board.appendChild(box);
        }

        // Add an event listener to the keypress event.
        document.addEventListener("keydown", keyDownHandler, false);

        gameLoop();
    } else {
        location.reload();
    }
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