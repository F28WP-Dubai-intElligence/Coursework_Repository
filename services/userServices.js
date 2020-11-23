const { User } = require('../models/entities');
const userDAO = require('../daos/userDAO');

const loginService = (username, password, callback) => {
    //check if the user is in the DB
    userDAO.findByUsername(username, function(err, rows) {
        if (rows.length == 0) {
            //the user is not in the DB
            console.log("user does not exist");
            callback(true, null);
        } else {
            console.log(`selected user ${rows[0].id}, ${rows[0].username}, ${rows[0].password}, ${rows[0].email}`);
            user = new User(rows[0].id, rows[0].username, rows[0].password, rows[0].email);
            callback(null, user);
        }
    });
};

const registerService = (username, password, email, callback) => {
            userDAO.createUser(username, password, email, function(err, affectedRows, insertId) {
                console.log(`Insertion  from DAO : ${affectedRows}, ${insertId}`);
                if (affectedRows != 0) {
                    console.log(`new user ${insertId}, ${username}, ${email}`);
                    user = new User(insertId, username, email);
                    callback(null, user);
                }else{
                    callback(true, null);
                }
            });
};

const searchService = function(callback) {
    userDAO.find(function(err, rows) {
        if (rows.length == 0) {
            console.log("No users!");
        } else {
            callback(null, rows);
        }
    });
};

const searchIDService = function(id, callback) {
    userDAO.findById(id, function(err, rows) {
        if (rows.length == 0) { //unkown
            console.log("Unkown user!");
            let user = null;
            calback(null, user);
        } else {

            let user = new User(rows[0].id, rows[0].pseudoname, rows[0].email);
            callback(null, user);
        }
    });
};

const deleteService = function(id, callback) {
    let count = userDAO.deleteUser(id, function(err, count) {
        if (count === 0) { //unkown
            console.log("No user deleted!");
            callback(null, false);
        } else {
            callback(null, true);
        }
    });
};

module.exports = {
    loginService,
    registerService,
    searchIDService,
    searchService,
    deleteService
};