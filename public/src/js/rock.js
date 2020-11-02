function randomleft() {
    var x = Math.floor((Math.random() * X_MAX));
    return x;
}

function randomtop() {
    var x = Math.floor(((Y_MIN + 10) + (Math.random() * (Y_MAX - Y_MIN))));
    return x;
}

function randomvel() {
    var random = [];
    min = Math.ceil(15);
    max = Math.floor(7);
    random[0] = Math.floor(Math.random() * (max - min + 1) + min);
    random[1] = Math.floor(Math.random() * ((-1 * max) - (-1 * min) + 1) + (-1 * min));
    posorneg = Math.floor(Math.random() * ((Math.floor(1)) - 0 + 1) + 0);
    // console.log(random[posorneg]);
    return random[posorneg];
}

function Rock(rockpic, left, top, vx, vy) {
    this.element = rockpic;
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
            //meteor boundaries
            if (that.x >= X_MAX || that.x <= X_MIN) {
                that.dx = that.dx * -1;
            }
            if (that.y >= Y_MAX - 50 || that.y <= Y_MIN + 10) {
                that.dy *= -1;
            }
            that.x = that.x + that.dx;
            that.y = that.y + that.dy;
            that.element.style.left = that.x + 'px';
            that.element.style.top = that.y + 'px';
        }
    }
}

function addRocks() {
    rocks.forEach(rock => {
        // console.log(rockID);
        rockData[rockID] = { top: randomtop(), left: randomleft(), xvel: randomvel(), yvel: randomvel() };
        var rock1 = new Rock(rock, rockData[rockID].left, rockData[rockID].top, rockData[rockID].xvel, rockData[rockID].yvel);
        rock1.initr();
        // console.log(data[rockID]);
        rockID++;
    });
}