const testSelect = function() {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: "sql12.freemysqlhosting.net",
        user: "sql12378272",
        password: "DLzSueTczD",
        database: "sql12378272"
    });

    connection.connect(function(err) {
        if (err) {
            console.log('connection problem');
            throw err;

        }

        const sqlTest = "SELECT * from sql12378272.login where username like 'kevin1231' and password like 'kevin12375764';";
        connection.query(sqlTest, function(err, result) {
            if (err) {
                console.log('SQL error');
            } else {
                console.log(result);
            }
        });

    });

};

module.exports = testSelect;
testSelect();