//const { Player } = require('../models/entities');
var SQL = require('sql-template-strings');
const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: "sql12.freemysqlhosting.net",
    user: "sql12378272",
    password: "DLzSueTczD",
    database: "sql12378272",
    debug: true
});

function executeQuery(query, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            return callback(err, null);
        } else if (connection) {
            connection.query(query, function(err, rows, fields) {
                connection.release();
                if (err) {
                    return callback(err, null);
                }
                return callback(null, rows);
            });
        } else {
            return callback(true, "No Connection");
        }
    });
}


function getResult(query, callback) {
    executeQuery(query, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            callback(true, err);
        }
    });
}

function find(callback) {
    const selectUsers = "SELECT * from sql12378272.login; ";
    getResult(selectUsers, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function findByUsername(username, callback) {
    const selectUser = (SQL `SELECT * from sql12378272.login where username like ${username};`);
    getResult(selectUser, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function findByUsernameLeader(username, callback) {
    const selectUser = (SQL `SELECT * from sql12378272.leaderboard where username like ${username};`);
    getResult(selectUser, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}


function findByEmail(email, callback) {
    const selectUser = (SQL `SELECT * from sql12378272.login where email like ${email};`);
    getResult(selectUser, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function updateScore(username, score, callback) {
    const insertScore = (SQL `UPDATE sql12378272.leaderboard SET score=(${score}) WHERE username like ${username} ;`);
    getResult(insertScore, function(err, result) {
        if (!err) {
            callback(null, result);
        } else {
            console.log(err);
        }
    });
}

function createScore(username, score, callback) {
    const insertScore = (SQL `INSERT INTO sql12378272.leaderboard (username, score) VALUES (${username}, ${score}) ;`);
    getResult(insertScore, function(err, result) {
        if (!err) {
            callback(null, result);
        } else {
            console.log(err);
        }
    });
}


function displayscores(callback) {
    const selectPlayer = (SQL `SELECT username,score FROM sql12378272.leaderboard ORDER BY score DESC LIMIT 5;`);
    getResult(selectPlayer, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function findById(id, callback) {
    const selectUser = (SQL `SELECT * from sql12378272.login where id = ${id};`);
    getResult(selectUser, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function checkPass(username, password, email, callback) {
    const selectUser = (SQL `SELECT * from sql12378272.login where username like ${username} and password like ${password} and email like ${email};`);
    getResult(selectUser, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}


function createUser(username, password, email, callback) {
    const insertUser = (SQL `INSERT INTO sql12378272.login (username, password, email) VALUES (${username}, ${password}, ${email}) ;`);
    getResult(insertUser, function(err, result) {
        if (!err) {
            callback(null, result.affectedRows, result.insertId);
        } else {
            console.log(err);
        }
    });
}



function deleteUser(id, callback) {
    const insertUser = (SQL `DELETE from sql12378272.login where id = ${id};`);
    getResult(selectUser, function(err, result) {
        if (!err) {
            console.log("Number of users inserted: " + result.affectedRows);
            callback(null, result.affectedRows);
        } else {
            console.log(err);
        }
    });
}


module.exports = {
    find,
    findByUsername,
    findByUsernameLeader,
    findByEmail,
    findById,
    createUser,
    deleteUser,
    createScore,
    displayscores,
    updateScore,
    checkPass
};