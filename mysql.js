var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Dmagmagma1234!',
  database : 'osongLostSystem'
});
 
connection.connect();
 
connection.query('SELECT * FROM instorage', function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});
 
connection.end();