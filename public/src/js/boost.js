function boostUpdate() {
    var boostBarLeft = document.getElementById("boostleft");
    var boostBar = document.getElementById("boost");
    var boostUpdInt = setInterval(boostupdater, 71);

    function boostupdater() {
        if (boostLeft > 0) {
            // boostBarLeft.style.width = boostBarLeft.clientWidth - ((totalBoost - boostLeft) / boostBarLeft.clientWidth) + "px";
            boostUsed = totalBoost - boostLeft;
            boostBarLeft.style.width = ((boostBar.clientWidth / 250) * boostUsed) + "px";
        } else {
            boostBarLeft.style.width = boostBarLeft.clientWidth + "px";
            clearInterval(boostUpdInt);
        }

    }
}