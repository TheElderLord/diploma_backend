const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sitcenter_kgd'
});

connection.connect();

module.exports = connection;
