const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'bookstore'
});

db.connect(err => {
    if (err) console.log(err);
    else console.log("DB Connected");
});

module.exports = db;