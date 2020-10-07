let leftShip;
let rightShip; 
 
function setup() {
  createCanvas(400, 400);
  leftShip = new Ship(width * 0.33);
  rightShip = new Ship(width * 0.66);
}
 
function draw() {
  background(0);
   
  leftShip.update();
  rightShip.update();
   
  leftShip.display();
  rightShip.display();
}
 
 
function keyPressed() {
  if (keyCode == UP_ARROW) {
    rightShip.isUp = true;
    rightShip.isDown = false;
  } else if (keyCode == DOWN_ARROW) {
    rightShip.isDown = true;
    rightShip.isUp = false;
  }
   
   
  if (keyCode == 87) {
    // keycode is 'w'
    leftShip.isUp = true;
    leftShip.isDown = false;
  } else if (keyCode == 83) {
    // keycode is 's'
    leftShip.isDown = true;
    leftShip.isUp = false;
  }
}
function keyReleased() {
  if (keyCode == UP_ARROW) {
    rightShip.isUp = false;
  } else if (keyCode == DOWN_ARROW) {
    rightShip.isDown = false;
  }
   
  if (keyCode == 87) {
    leftShip.isUp = false;
  } else if (keyCode == 83) {
    leftShip.isDown = false;
  }
}