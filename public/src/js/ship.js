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
    let i = 0;
    let leftBound = 0;
    while (i < noOfPlayers) {
        let screens = boardWidth / noOfPlayers;
        let ship_Y_INIT = board.offsetTop + 0.9 * boardHeight;
        let ship_X_INIT = (leftBound + screens) - (screens / 2);
        ships[i].style.left = ship_X_INIT + "px";
        ships[i].style.top = ship_Y_INIT + "px";
        leftBound += screens;
        i++;
    }


}