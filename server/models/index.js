var db = require('../db');

module.exports = {

  users: {
  signin: function (params, callback) {
      // fetch all messages
      // text, username, roomname, id
      var queryStr = "SELECT * FROM users WHERE userName LIKE '" + params[0] + "';";
      db.query(queryStr, function(err, results) {
        callback(err, results[0]);
      });
    },
    signup: function (params, callback) {
      console.log('models signup', params);
      var queryStr = "INSERT INTO users (userName, firstName, lastName, password, ticketSent, ticketAvailable) VALUES ('" + params[0] + "', '" + params[1] + "', '" + params[2] + "', '" + params[3] + "', 1, 0);";
      db.query(queryStr, function(err, results) {
        console.log("in the database hopefully....", err)
        console.log("in signup", results)
        callback(err, results);
      });
    },
    send: function (params, callback) {
      console.log("params in models", params)
      var randomId = "SELECT id FROM users ORDER BY RAND() LIMIT 1;";
      //query userdatabase for random user
      //once id - insert ticketdataase
      //make sure user that ticket is being sent to is not the same as the one being from
      db.query(randomId, function(err, results) {
        console.log("results from randomID query", results, "err", err)
        idSearchErr = err;
        idSearchResults = results;
        var createTicket = "INSERT INTO tickets (redeemed, sentBy, receivedBy, message) VALUES (false, " + params[0] + ", " + results[0].id + ", '" + params[1] + "');";
        db.query(createTicket, function (err, results) {
          console.log("possibly created ticket with randomid (?)", results, "err", err);
          callback(idSearchErr, idSearchResults);
        });
      });
    },
    redeem: function (params, callback) {
      console.log("This is params", params)
      var ticket = "SELECT * FROM tickets WHERE receivedBy LIKE " + params[0] + " AND redeemed LIKE false LIMIT 1;";
      db.query(ticket, function(err, results) {
        var ticketSearchResult = results;
        var ticketSearchError = err;
        console.log('ticket query redeem result', results)
        var changeRedeemVal = "UPDATE tickets SET redeemed=1 WHERE id=" + results[0].id + ";";
        db.query(changeRedeemVal, function (err, results) {
          console.log("change ticket value results", results)
          callback(ticketSearchError, ticketSearchResult);
        })
      })
    }
  }
}