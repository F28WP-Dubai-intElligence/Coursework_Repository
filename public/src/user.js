function init(){
    $(document).ready (function () {
        $("#register").click(function(e){
            var username = $("#username").val();
            var pass = $("#psw").val();
            var email = $("#email").val();
            var user = { username: username, password: pass, email:email }; //username is attribute
            console.log(name + "'" + pass);
            $.get("game.html");
            $.post('/api/register', user, function(result) {
                console.log(result);
                $.get("game.html");
            })
            .fail(function() {
            console.log("error loading user");
            });
        });
        $("#login").click(function(e){
            var username = $("#username").val();
            var pass = $("#psw").val();
            
            var user = { username: username, password: pass, email:email }; //username is attribute
            console.log(name + "'" + pass);
            $.post('/api/login', user, function(result) { //IF RESULT IS NULL NO GAME , IF RESULT IS USER THEN GET GAME;HTML
                console.log(result);
                if (result === null){
                    alert("Username or password not available")
                } else{
                //code to show the game.html
                $.get("game.html");
                }
            })
            .fail(function() {
            console.log("error loading user");
            });
        })
    });
}