function keyHandler() {

    if (keyState[KEYRIGHT]) {
        X_ship_Direction = 1;
        ship_Move_X = 1;
        // ships[playerID].setAttribute("src", shipGif[playerID]);
    }
    if (keyState[KEYLEFT]) {
        X_ship_Direction = -1;
        ship_Move_X = 1;
        // ships[playerID].setAttribute("src", shipGif[playerID]);
    }

    if (keyState[KEYUP]) {
        if (test == false) {
            ships[playerID].setAttribute("src", "assets/images/rocket1.gif");
            ships[playerID].style.height = 100 + 'px';
        }
        test = true;
        Y_ship_Direction = -1;
        ship_Move_Y = 1;
        // ships[playerID].setAttribute("src", shipGif[playerID]);
    }
    if (keyState[KEYDOWN]) {
        Y_ship_Direction = 1;
        ship_Move_Y = 1;
        // ships[playerID].setAttribute("src", shipGif[playerID]);
    }

    if (!keyState[KEYLEFT] && !keyState[KEYRIGHT] && !keyState[KEYUP] && !keyState[KEYDOWN]) {
        ships[playerID].setAttribute("src", "assets/images/rocket1.gif");
        test = false;
        ships[playerID].style.height = 90 + 'px';
    }

    if (keyState[SPACEBAR] && (keyState[KEYLEFT] || keyState[KEYRIGHT] || keyState[KEYUP] || keyState[KEYDOWN])) {
        if (boostLeft >= 0) {
            ship_Y_STEP = 6;
            boostLeft -= 1;
        } else {
            ship_Y_STEP = 3;
        }
    }
    if (!keyState[SPACEBAR]) {
        ship_Y_STEP = 3;
    }
}

function keyDOWN(e) {
    keyState[e.keyCode] = true;
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
}

function keyUP(e) {
    keyState[e.keyCode] = false;
}