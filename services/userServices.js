const { User } = require('../models/entities');
const userDAO = require('../daos/userDAO');
const { Score } = require('../models/entities');

const loginService = (username, password, email, callback) => {
    userDAO.checkPass(username, password, email, function(err, result) {
            if (!err) {
                //already in db
                callback(null, result);

            } else {
                callback(false, result);
            }
        }



    );
};


const registerService = (username, password, iv, email, callback) => {
    userDAO.findByUsername(username, function(err, rowsuser) {
        userDAO.findByEmail(email, function(err, rowsmail) {
                if (rowsuser.length != 0 || rowsmail.length != 0) {
                    //already in db
                    callback(false, 1);

                } else {
                    //not in db
                    userDAO.createUser(username, password, iv, email, function(err, affectedRows, insertId) {
                        console.log(`Insertion  from DAO : ${affectedRows}, ${insertId}`);
                        if (affectedRows != 0) {
                            console.log(`new user ${insertId}, ${username}, ${email}`);
                            user = new User(insertId, username, email);
                            callback(null, 2);
                        } else {
                            callback(true, 0);
                        }
                    });

                }
            }


        )
    });


};

const newLeaderService = (username, score, callback) => {
    console.log("already in");
    userDAO.findByUsernameLeader(username, function(err, result) {
        userDAO.createScore(username, score, function(err, result) {
            if (result.length != 0) {
                score = new Score(username, score);
                callback(null, 2);
            } else {
                callback(true, 0);
            }
        });
    });


};


const scoreService = (callback) => {
    userDAO.displayscores(function(err, scoreData) {
        if (scoreData.rows != 0) {
            callback(null, scoreData);
        } else {
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
    deleteService,
    newLeaderService,
    scoreService
};