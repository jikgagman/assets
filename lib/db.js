var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Dmagmagma1234!',
    database:'osonglostsystem'
});
db.connect();
module.exports = db;