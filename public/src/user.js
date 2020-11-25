function init() {
    $(document).ready(function() {
        $("#register").click(function(e) {
            var username = $("#username").val();
            var pass = $("#psw").val();
            var email = $("#email").val();
            if( validatePassword(pass) === true && validateEmail(email) === true){
            var user = { username: username, password: pass, email: email}//username is attribute
            $.post('/api/register', user, function(result) {
                    console.log("result: " + result.outcome);
                    if (result.outcome == 1 || result.outcome == 0) {
                        window.alert("The username/Email-ID is already in use");

                    } else if (result.outcome == 2) {
                        setCookie("username", username, 30);
                        window.location.replace('game.html');
                    }
                })
                .fail(function() {
                    window.alert(result);
                    console.log("error loading user");
                });
        } else if (validatePassword(pass) === false && validateEmail(email) === true){
            window.alert("Please enter valid password");
        } else if (validatePassword(pass) === true && validateEmail(email) === false){
            window.alert("Please enter valid email");
        } else {
            window.alert("Please enter valid email and password");
        }
        });
        $("#login").click(function(e) {
            var username = $("#username").val();
            var pass = $("#psw").val();
            var email = $("#email").val();
            if( validatePassword(pass) === true && validateEmail(email) === true){
            var user = { username: username, password: pass, email: email}; //username is attribute
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
            }else if (validatePassword(pass) === false && validateEmail(email) === true){
                window.alert("Please enter valid password");
            } else if (validatePassword(pass) === true && validateEmail(email) === false){
                window.alert("Please enter valid email");
            } else {
                window.alert("Please enter valid email and password");
            }
        })
    });
}

function validateEmail(elementValue){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue); 
} 

function validatePassword(elementValue) {
    var passwordPattern = /(?=.*\d).{8,}/;
    return passwordPattern.test(elementValue)
}