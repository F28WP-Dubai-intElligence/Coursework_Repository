// THIS IS THE JAVASCRIPT FILE FOR IMPLEMENTING FUNCTIONS THAT HANDLE THE SERVER SIDE/DB COMMUNICATIONS FOR UPDATING THE LEADERBOARD

// IT IMPLEMENTS THE FOLLOWING:
// 1. functions that get the appropriate usernames and scores and updates it into the table on the leaderboard html page

// the function that runs everytime the leaderboard.html or gameover.html files are open since both need the leaderboard to be displayed
function init() {
    $(document).ready(function() {
        var username = getCookie("username");
        var score = getCookie("score");
        var userScore = { username: username, score: score };
        $.post('/api/leaderboardUpdate', userScore, function(resultUpd) {})
        setTimeout(function() {
            $.post('/api/leaderboard', function(result) {
                    // console.log(result[0]);
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
    setCookie("score", "", 30);
    setCookie("username", "", 30);

};