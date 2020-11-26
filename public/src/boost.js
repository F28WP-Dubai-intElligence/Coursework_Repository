// THIS IS THE JAVASCRIPT FILE FOR THE BOOST FUNCTIONALITY OF THE GAME
//IT IMPLEMENTS THE FOLLOWING:

// 1. function to constantly update the boostbar



//this function updates the boost bar found on the right side of the game.
function boostUpdate() {
    var boostBarLeft = document.getElementById("boostleft");
    var boostBar = document.getElementById("boost");
    var boostUpdInt = setInterval(boostupdater, 71);

    function boostupdater() {
        if (boostLeft > 0) {
            boostUsed = totalBoost - boostLeft;
            boostBarLeft.style.width = ((boostBar.clientWidth / 250) * boostUsed) + "px";
        } else {
            boostBarLeft.style.width = boostBarLeft.clientWidth + "px";
            clearInterval(boostUpdInt);
        }

    }
}