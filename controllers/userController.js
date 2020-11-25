const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

function encrypt(text) {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

// const decrypt = (hash) => {

//     const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

//     const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

//     return decrpyted.toString();
// };
const loginCtrl = (request, response) => {
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
    });
};

const registerCtrl = (request, response) => {
    const loginServices = require('../services/userServices');

    let username = request.body.username;
    let encrypted = encrypt(request.body.password);
    let password = encrypted.content;
    let iv = encrypted.iv;
    let email = request.body.email;

    console.log(username + "," + password + "," + email);
    loginServices.registerService(username, password, iv, email, function(err, result) {
        console.log("User from login service :");
        if (err) {
            console.log("No user inserted!");
            response.json({ outcome: result });


        } else {
            console.log("Insertion went through!");
            response.json({ outcome: result });

        }
        response.end();
    });
};

const getUsers = (request, response) => {
    const loginServices = require('../services/userServices');
    loginServices.searchService(function(err, rows) {
        response.json(rows);
        response.end();
    });
};

const leaderCtrl = (request, response) => {
    let username = request.body.username;
    let score = request.body.score;
    const loginServices = require('../services/userServices');
    loginServices.newLeaderService(username, score, function(err, rows) {
        response.json(rows);
        response.end();
    });
};

const leaderScoreCtrl = (request, response) => {
    const loginServices = require('../services/userServices');
    loginServices.scoreService(function(err, rows) {
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
    leaderCtrl,
    leaderScoreCtrl,
    getUserByID
};