function init() {
    $(document).ready(function() {
        $("#register").click(function(e) {
            var username = $("#username").val();
            var pass = $("#psw").val();
            var email = $("#email").val();
            var user = { username: username, password: pass, email: email }; //username is attribute
            console.log(name + "'" + pass);
            alert(result);
            $.post('/api/register', user, function(result) {
                    console.log(result);
                    window.alert("test");
                    // window.navigate("game.html");
                    $.get("game.html");
                })
                .fail(function() {
                    window.alert("test");
                    console.log("error loading user");
                });
        });
        $("#login").click(function(e) {
            var username = $("#username").val();
            var pass = $("#psw").val();

            var user = { username: username, password: pass, email: email }; //username is attribute
            console.log(username + "'" + pass);
            $.post('/api/login', user, function(result) { //IF RESULT IS NULL NO GAME , IF RESULT IS USER THEN GET GAME;HTML
                    console.log(result);
                    if (result === null) {
                        alert("Username or password not available")
                    } else {
                        //code to show the game.html
                        $.get("public/src/game.html");
                    }
                })
                .fail(function() {
                    console.log("error loading user");
                });
        })
    });
}