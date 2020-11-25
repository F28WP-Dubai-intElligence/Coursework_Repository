function init() {
    $(document).ready(function() {
        // var username = $("#username").val();
        // var score = $("#score").val();
        // var user = { username: username, score: score }; //username is attribute
        // console.log(name + "'" + pass);
        var username = getCookie("username");
        var score = getCookie("score");
        var userScore = { username: username, score: score }; //username is attribute
        $.post('/api/leaderboardUpdate', userScore, function(resultUpd) {})
        setTimeout(function() {
            $.post('/api/leaderboard', function(result) { //IF RESULT IS NULL NO GAME , IF RESULT IS USER THEN GET GAME;HTML
                    console.log(result[0]);
                    var i = 0;
                    while (i < result.length) {
                        $("#" + i + "user").html(result[i].username);
                        $("#" + i + "score").html(result[i].score);
                        i++;
                    }
                    console.log("test" + result.length);
                })
                .fail(function() {
                    window.alert("test1");
                    console.log("error loading user");
                });

        }, 2000)


    })
};