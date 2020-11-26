// THIS IS A DEV TEST FILE TO CHECK SQL FUNCTIONING

// const testSelect = function() {
//     const mysql = require('mysql');
//     const connection = mysql.createConnection({
//         host: "us-cdbr-east-02.cleardb.com",
// user: "bb3d62c22aa361",
// password: "f9e7ee1f",
// database: "heroku_e534da4fe4548bf",
//     });

//     connection.connect(function(err) {
//         if (err) {
//             console.log('connection problem');
//             throw err;

//         }

//         const sqlTest2 = "SELECT username,score FROM leaderboard ORDER BY score DESC LIMIT 5;";
//         connection.query(sqlTest2, function(err, result) {
//             if (err) {

//             } else {
//                 console.log(result);
//             }
//         });

//     });

// };

// module.exports = testSelect;
// testSelect();