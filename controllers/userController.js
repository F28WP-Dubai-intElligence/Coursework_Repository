const loginCtrl = (request, response, next) => {
    const loginServices = require('../services/userServices');
    let username = request.body.username;
    let password = request.body.password;
    let email = request.body.email;
    loginServices.loginService(username, password, email, function(err, result) {
        console.log("User from login service ");
        if (err) {
            location.reload();
            response.json({ outcome: result });
        } else {
            response.json({ outcome: result });
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

    console.log(username + "," + password + "," + email);
    loginServices.registerService(username, password, email, function(err, result) {
        console.log("User from login service :");
        if (err) {
            console.log("No user inserted!");
            response.json({ outcome: result });
        } else {
            console.log("Insertion went through!");
            response.json({ outcome: result });
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