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
    console.log(playerID);
    let ship_Y_INIT = board.offsetTop + 0.9 * boardHeight;
    let ship_X_INIT = boardWidth - (boardWidth / 2);
    ships[playerID].style.width = 1000 + "px";
    ships[playerID].style.left = ship_X_INIT + "px";
    ships[playerID].style.top = ship_Y_INIT + "px";
    shipspawn.src = "assets/images/shiptop 2.gif";
    shipspawn.style.visibility = "visible";
    shipspawn.style.top = ship_Y_INIT - 20 + 'px';
    shipspawn.style.left = ship_X_INIT - 30 + 'px';
    setTimeout(function() {
        shipspawn.style.visibility = "hidden";
    }, 700);


}


function shipInit() {
    let ship_Y_INIT = board.offsetTop + 0.9 * boardHeight;
    let ship_X_INIT = boardWidth - (boardWidth / 2);
    ships[playerID].style.left = ship_X_INIT + "px";
    ships[playerID].style.top = ship_Y_INIT + "px";
    shipspawn.src = "assets/images/shiptop 2.gif";
    shipspawn.style.visibility = "visible";
    shipspawn.style.top = ship_Y_INIT - 20 + 'px';
    shipspawn.style.left = ship_X_INIT - 30 + 'px';
    setTimeout(function() {
        shipspawn.style.visibility = "hidden";
    }, 700);

}