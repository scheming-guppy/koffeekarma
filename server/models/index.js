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
    signup: function (params, callback) {
      var queryStr = "INSERT INTO users (userName, firstName, lastName, password, ticketSent, ticketAvailable) VALUES (" + params[0] + ", " + params[1] + ", " + params[2] + ", " + params[3] + ", 1, 0);";
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });
    },
    send: function (params, callback) {
      var randomId = "SELECT id FROM users ORDER BY RAND() LIMIT 1;";
      var createTicket = "INSERT INTO tickets (redeemed, sentBy, receivedBy, message) "
      //query userdatabase for random user
      //once id - insert ticketdataase
      //make sure user that ticket is being sent to is not the same as the one being from
      db.query(queryStr, function(err, results) {
        callback(err, results);
      });
    },
    redeem: function (params, callback) {
      var queryStr = "";
      db.query(queryStr, function(err, results) {
        callback(err, results);
      })
    }
  }