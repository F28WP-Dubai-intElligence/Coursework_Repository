// THIS IS THE JAVASCRIPT FILE FOR FUNCTIONS RELATED TO THE FIRE METEORS IMPLEMENTATION

// IT IMPLEMENTS THE FOLLOWING:
// 1. a constructor funciton to store the meteor data
// 2. functions that randomly assign vales to simulate random motion of meteors
// 3. functions that invoke and display the warning for the meteor strikes

//constructor function to store the respective values for each meteor
function Meteor(meteorpic, left, top, vx, vy) {
    this.element = meteorpic;
    this.x = left;
    this.y = top;
    this.dx = vx;
    this.dy = vy;

    var move;
    var that = this;
    this.initm = function() {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.updatePositiveM();
    }

    this.updatePositiveM = function() {
        flip = setInterval(flipFireball, 100);
        move = setInterval(frameM, 100);

        function frameM() {
            if (that.y >= Y_MAX - 120) {
                that.dy *= -1;
            }
            that.x = that.x + that.dx;
            that.y = that.y + that.dy;
            that.element.style.left = that.x + 'px';
            that.element.style.top = that.y + 'px';
        }

        function flipFireball() {
            if (that.dy <= 0) {
                clearTimeout(flip);
                that.element.src = "assets/images/fireball_flip.gif";
            }
        }
    }
}

//function to assign a random value for the position from top value of the meteor
function meteorTop() {
    return Math.random() * (0.3 - (-0.2)) - 0.2;
}

//function to assign a random value for the x axis velocity value of the meteor
function meteorXVel() {
    return Math.random() * (-10 - (-30)) - 30;
}

//function to assign a random value for the position from left value of the meteor
function meteorLeft() {
    return Math.random() * (200);
}

//function to assign a random value for the y axis velocity value of the meteor
function meteorYVel() {
    return Math.random() * (10);
}

// function that calls the strike at the right time and adds the meteors to the screen
function callStrike() {
    strikeTime = setTimeout(addMeteors, 30000);

    function addMeteors() {
        clearTimeout(strikeTime);
        meteors.forEach(meteor => {
            // console.log(meteorID);
            meteorData[meteorID] = { top: (meteorTop() * boardHeight), left: meteorLeft() + boardWidth, xvel: meteorXVel(), yvel: meteorYVel() };
            console.log(meteorTop() * boardHeight);
            var meteor1 = new Meteor(meteor, meteorData[meteorID].left, meteorData[meteorID].top, meteorData[meteorID].xvel, meteorData[meteorID].yvel);
            meteor1.initm();
            meteorID++;
        });

    }
}

//function that invokes the warnings that are displayed before the metoers strike
function strikeWarning() {
    visibleTime = setTimeout(showWarning, 25000);
    hiddenTime = setTimeout(hideWarning, 30000)

    function showWarning() {
        clearTimeout(visibleTime);
        warning.style.visibility = "visible";
        setInterval(function() {
            warning.style.background = "blanchedalmond";
            warning.style.color = "black";
        }, 500)
        setInterval(function() {
            warning.style.background = "black";
            warning.style.color = "blanchedalmond";
        }, 1000)

    }

    function hideWarning() {
        clearTimeout(hiddenTime);
        warning.style.visibility = "hidden";
    }

}