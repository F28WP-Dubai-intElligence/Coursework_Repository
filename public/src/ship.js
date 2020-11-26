// THIS IS THE JAVASCRIPT FILE FOR FUNCTIONS RELATED TO THE IMPLEMENATION OF THE SPACESHIP

// IT IMPLEMENTS THE FOLLOWING:
// 1. sets the new positions for the ship continuously
// 2. intializes the ship to the correct position


// function that sets the ship to the specified position
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

//function that initalizes the ship position on the board
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