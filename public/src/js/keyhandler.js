function keyHandler() {
    if (keyState[KEYRIGHT]) {
        X_ship1_Direction = 1;
        ship1_Move_X = 1;
    } // right key
    if (keyState[KEYLEFT]) {
        X_ship1_Direction = -1;
        ship1_Move_X = 1;
    } // left key

    if (keyState[KEYUP]) {
        Y_ship1_Direction = -1;
        ship1_Move_Y = 1;
    } // up key
    if (keyState[KEYDOWN]) {
        Y_ship1_Direction = 1;
        ship1_Move_Y = 1;
    } // up key
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