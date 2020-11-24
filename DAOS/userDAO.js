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
    console.log("test");

    const selectUser = (SQL `SELECT * from sql12378272.login where username = ${username};`);
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

function findByUsername2(username, callback) {
    const selectPlayer = (SQL `SELECT * from sql12378272.leaderboard ORDER BY score desc;`);
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

function createScoreBoard(username, score, callback) {
    const insertScore = (SQL `INSERT INTO sql12378272.leaderboard (username, score) VALUES (${username}, ${score}) ;`);
    getResult(insertScore, function(err, result) {
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
    findByEmail,
    findById,
    createUser,
    deleteUser,
    createScoreBoard,
    findByUsername2

};