var mysql = require('mysql');


var connection = mysql.createConnection({
  // host: 'us-cdbr-iron-east-03.cleardb.net',
  // user: 'ba4dfb558bcf63',
  // password: '088116de',
  // database: 'heroku_0e4294a909d7b04'
  user: "root",
  password: "guppy",
  database: "tickitDB"
});

connection.connect();

module.exports = connection;

