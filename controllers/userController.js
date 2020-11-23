const loginCtrl = (request, response, next) => {
    const loginServices = require('../services/userServices');
    let username = request.body.username;
    let password = request.body.password;

    loginServices.loginService(username, password, function(err, user) {
        console.log("User from login service ");
        if (user === null) {
            console.log("Auhtentication problem!");
            response.json(null);
        } else {
            console.log("Auhtentication went through!");
            //add username to the session
            response.json(user);
        }
        response.end();
        next();
    });
};

const registerCtrl = (request, response, next) => {
    const loginServices = require('../services/userServices');

    let username = request.body.username;
    let password = request.body.password;
    let email = request.body.email;

    console.log(username + "," + password+ "," + email);
    loginServices.registerService(username, password, email, function(err, user) {
        console.log("User from login service :" + user.id);
        if (err) {
            console.log("No user inserted!");
            response.write("No user inserted");
        } else {
            console.log("Insertion went through!");
            response.json(user);
        }
        response.end();
        next();
    });
};

const getUsers = (request, response) => {
    const loginServices = require('../services/userServices');
    loginServices.searchService(function(err, rows) {
        response.json(rows);
        response.end();
    });
};

const getUserByID = (request, response) => {
    const loginServices = require('../services/userServices');
    let id = request.params.id;
    loginServices.searchIDService(id, function(err, rows) {
        response.json(rows);
        response.end();
    });
};

module.exports = {
    loginCtrl,
    registerCtrl,
    getUsers,
    getUserByID
};