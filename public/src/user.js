function init() {
    $(document).ready(function() {
        $("#register").click(function(e) {
            var username = $("#username").val();
            var pass = $("#psw").val();
            var email = $("#email").val();
            var user = { username: username, password: pass, email: email }; //username is attribute
            $.post('/api/register', user, function(result) {
                    console.log("result: " + result.outcome);
                    if (result.outcome == 1 || result.outcome == 0) {
                        window.alert("The username/Email-ID is already in use");

                    } else if (result.outcome == 2) {
                        sessionStorage.setItem('curUser', username);
                        window.location.replace('public/src/game.html');
                    }
                })
                .fail(function() {
                    window.alert(result);
                    console.log("error loading user");
                });

        });
        $("#login").click(function(e) {
            var username = $("#username").val();
            var pass = $("#psw").val();
            var email = $("#email").val();
            var user = { username: username, password: pass, email: email }; //username is attribute
            $.post('/api/login', user, function(result) { //IF RESULT IS NULL NO GAME , IF RESULT IS USER THEN GET GAME;HTML
                    console.log("result: " + result.outcome);
                    if (result.outcome == 2) {
                        window.alert("Invalid username/Email-ID/password combination");

                    } else if (result.outcome == 1) {
                        window.location.replace('game.html');
                    }
                })
                .fail(function() {
                    console.log("error loading user");
                });
        })
    });
}