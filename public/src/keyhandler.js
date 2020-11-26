// THIS IS THE JAVASCRIPT FILE FOR IMPLEMENTING ALL THE FUNCTIONS THAT HANDLE THE VARIOUS 
// INPUTS GIVEN BY THE USER ON THE KEYBAORD

// IT IMPLEMENTS THE FOLLOWING:
// 1. a keyhandler function which constantly checks and updates the keys pressed down
// 2. depending on key pressed animations are handled



// the main function that checks for the key held down and execute the appropriate movement on screen
function keyHandler() {

    if (keyState[KEYRIGHT]) {
        X_ship_Direction = 1;
        ship_Move_X = 1;
    }
    if (keyState[KEYLEFT]) {
        X_ship_Direction = -1;
        ship_Move_X = 1;
    }

    if (keyState[KEYUP]) {
        if (test == false) {
            ships[playerID].setAttribute("src", shipGifs[playerID]);
            ships[playerID].style.height = 100 + 'px';
        }
        test = true;
        Y_ship_Direction = -1;
        ship_Move_Y = 1;
    }
    if (keyState[KEYDOWN]) {
        Y_ship_Direction = 1;
        ship_Move_Y = 1;
    }

    if (!keyState[KEYLEFT] && !keyState[KEYRIGHT] && !keyState[KEYUP] && !keyState[KEYDOWN]) {
        ships[playerID].setAttribute("src", shipGifs[playerID]);
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

//function that is executed for the keydown handler
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

//function that is executed for the keyup handler
function keyUP(e) {
    keyState[e.keyCode] = false;
}