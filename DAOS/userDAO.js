//const { Player } = require('../models/entities');
var SQL = require('sql-template-strings');
const mysql = require('mysql');

const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

var pool = mysql.createPool({
    connectionLimit: 100,
    host: "us-cdbr-east-02.cleardb.com",
    user: "bb3d62c22aa361",
    password: "f9e7ee1f",
    database: "heroku_e534da4fe4548bf",
    debug: true
});

function decrypt(hash, iv) {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

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
    const selectUsers = "SELECT * from login; ";
    getResult(selectUsers, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function findByUsername(username, callback) {
    const selectUser = (SQL `SELECT * from login where username like ${username};`);
    getResult(selectUser, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function findByUsernameLeader(username, callback) {
    const selectUser = (SQL `SELECT * from leaderboard where username like ${username};`);
    getResult(selectUser, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}


function findByEmail(email, callback) {
    const selectUser = (SQL `SELECT * from login where email like ${email};`);
    getResult(selectUser, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function updateScore(username, score, callback) {
    const insertScore = (SQL `UPDATE leaderboard SET score=(${score}) WHERE username like ${username} ;`);
    getResult(insertScore, function(err, result) {
        if (!err) {
            callback(null, result);
        } else {
            console.log(err);
        }
    });
}

function createScore(username, score, callback) {
    const insertScore = (SQL `INSERT INTO leaderboard (username, score) VALUES (${username}, ${score}) ;`);
    getResult(insertScore, function(err, result) {
        if (!err) {
            callback(null, result);
        } else {
            console.log(err);
        }
    });
}


function displayscores(callback) {
    const selectPlayer = (SQL `SELECT username,score FROM leaderboard ORDER BY score DESC LIMIT 5;`);
    getResult(selectPlayer, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function findById(id, callback) {
    const selectUser = (SQL `SELECT * from login where id = ${id};`);
    getResult(selectUser, function(err, rows) {
        if (!err) {
            callback(null, rows);
        } else {
            console.log(err);
        }
    });
}

function checkPass(username, password, email, callback) {
    const selectUser = (SQL `SELECT * from login where username like ${username} and email like ${email};`);
    getResult(selectUser, function(err, rows) {
        if (!err) {
            if (rows.length != 0) {
                console.log(rows[0].iv.length);
                if (decrypt(rows[0].password, rows[0].iv) === password) {
                    callback(null, 1);
                } else {
                    callback(false, 3);
                }

            } else {
                callback(false, 2);
            }

        } else {
            console.log(err);
        }
    });
}


function createUser(username, password, iv, email, callback) {
    const insertUser = (SQL `INSERT INTO login (username, password, iv, email) VALUES (${username}, ${password}, ${iv}, ${email}) ;`);
    getResult(insertUser, function(err, result) {
        if (!err) {
            callback(null, result.affectedRows, result.insertId);
        } else {
            console.log(err);
        }
    });
}



function deleteUser(id, callback) {
    const insertUser = (SQL `DELETE from login where id = ${id};`);
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