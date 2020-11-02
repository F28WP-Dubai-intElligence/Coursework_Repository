function setNewPosition(element, dx, dy) {

    // // Get current positions
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

function shipInit() {
    console.log("board width " + boardWidth);
    let screens = boardWidth / noOfPlayers;
    console.log("screens " + screens);
    console.log("player count " + noOfPlayers);
    let leftBound = 0;
    console.log("leftbound = " + leftBound);
    let ship1_Y_INIT = board.offsetTop + 0.9 * boardHeight;

    //intitial locations of the ships
    // for (var i = 0; i > noOfPlayers; i++) {
    console.log("leftbound + screens = " + (leftBound + screens));
    console.log("newlocation = " + (leftBound + screens) / 2);
    // let ship_X_INIT = ((leftBound + screens) - leftBound) / 2;
    let ship1_X_INIT = ((leftBound + screens) - leftBound) / 2;
    // screens += screens;
    // }
    ship1.style.left = ship1_X_INIT + "px";
    ship1.style.top = ship1_Y_INIT + "px";
    leftBound += screens;

}