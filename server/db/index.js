var mysql = require('mysql');


var connection = mysql.createConnection({
  user: "root",
  password: "guppy",
  database: "tickitDB"
});

connection.connect();

module.exports = connection;

