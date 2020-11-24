function leaderboardscores() {
    $(document).ready(function() {
                $("#leaderboard").click(function(e) {
                    var username = $("#username").val();
                    var score = $("#score").val();
                    var user = { username: username, score: score }; //username is attribute
                    // console.log(name + "'" + pass);
                    $.post('/api/leaderboard', user, function(result) { //IF RESULT IS NULL NO GAME , IF RESULT IS USER THEN GET GAME;HTML
                            console.log(result);

                        })
                        .fail(function() {
                            window.alert("test");
                            console.log("error loading user");
                        });
                });