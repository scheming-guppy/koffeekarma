var db = require('../db');

module.exports = {

  users: {
  signin: function (params, callback) {
      // fetch all messages
      // text, username, roomname, id
      var queryStr = "SELECT * FROM users WHERE userName LIKE " + params[0] + ";";
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });
    },
    signup : function (params, callback) {
      var queryStr = "INSERT INTO users (userName, firstName, lastName, password, ticketSent, ticketAvailable) VALUES (" + params[0] + ", " + params[1] + ", " + params[2] + ", " + params[3] + ", 1, 0);";
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });
    }

  }