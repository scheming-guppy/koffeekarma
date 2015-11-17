var db = require('../db');

module.exports = {
//This interacts with the MySql database
  users: {
  signin: function (params, callback) { // Receiving signin requests
    // query: Get all information about user params[0] (userName is params[0], password is params[1])
    var queryStr = "SELECT * FROM users WHERE userName LIKE '" + params[0] + "';";
    db.query(queryStr, function(err, results) {
      callback(err, results[0]); // results[0] because the user's data comes as an object in an array
    });
  },
  signup: function (params, callback) {
    // query: Put a new user, given all passed-in info into the database. The 'ticket' values are hardcoded.
    //   When a user first creates an account, ticketSent = 1 because it makes their account eligible to receive tickets
    var queryStr = "INSERT INTO users (userName, firstName, lastName, password, ticketRedeemed, ticketSent, ticketAvailable) VALUES ('" + params[0] + "', '" + params[1] + "', '" + params[2] + "', '" + params[3] + "', 0, 1, 0);";
    db.query(queryStr, function(err, results) {
      callback(err, results); // MySQL INSERT queries don't really return useful info
    });
  },
  send: function (params, callback) {
    // query: Randomizes all users in the database, but selects only 1, effectively returning all info
    //   about just a single random user.
    //   POSSIBLE FIX: Currently, a user can be randomly selected to send to him or herself. This may not be ideal.
    var randomId = "SELECT * FROM users ORDER BY RAND() LIMIT 1;";
    /*
    
    NOTE:  Due to asynchronous calls to MySQL, we have to nest calls that rely on each other for data.
           First, we select a random user (see line 38), with that data we can use the passed in info and
           make a new ticket connected to both the user it was sent to and sent by via their unique IDs (line 45).
           However, we also must keep track of ticketSent (line 48) and ticketAvailable (line 54) values to inform other
           areas of site logic (i.e. we use ticketReceived - ticketRedeemed to calculate available tickets). 
           These each require their own UPDATE calls to the database, which must also be nested.
           Finally, we must return the updated data for the user that sent the ticket, so we end the nest
           with a SELECT call for that user's info (line 60).

    */
    db.query(randomId, function(err, results) {
      // idSearchErr = err;
      // idSearchResults = results;
      var receivingUser = results[0].id; // results is the random user object in an array, [0].id is the unique ID
      // query: Put a new ticket into the database. params[0] is the ID of the user that sent the ticket.
      //   See above for receivingUser. params[1] is the message sent along with the ticket.
      var createTicket = "INSERT INTO tickets (redeemed, sentBy, receivedBy, message) VALUES (false, " + params[0] + ", " + receivingUser + ", '" + params[1] + "');";
      db.query(createTicket, function (err, results) {
        // query: Increment by 1 the number of tickets sent by the sender
        var senderUpdate = "UPDATE users SET ticketSent = ticketSent + 1 WHERE id=" + params[0] + ";";
        db.query(senderUpdate, function (err, results) {
          if (err) {
            callback(err, results);
          } else {
            // query: Increment by 1 the number of tickets received by the receiver
            var receiverUpdate = "UPDATE users SET ticketAvailable = ticketAvailable + 1 WHERE id=" + receivingUser + ";";
            db.query(receiverUpdate, function (err, results) {
              if (err) {
                callback(err, results);
              } else {
                // query: Get and return the updated user info of the sender
                var senderInfo = "SELECT * FROM users WHERE id=" + params[0] + ";";
                db.query(senderInfo, function (err, results) {
                  // Here, results is the sender's info. We return this in callback to update mainpage info
                  callback(err, results);
                })
                // callback(idSearchErr, idSearchResults);
              }
            });
          }
        });
      });
    });
  },
  redeem: function (params, callback) {
    var userUpdate = params[0];
    var ticket = "SELECT * FROM tickets WHERE receivedBy LIKE " + userUpdate + " AND redeemed LIKE false LIMIT 1;";
    db.query(ticket, function(err, results) {
      var ticketSearchResult = results;
      var ticketSearchError = err;
      var changeRedeemVal = "UPDATE tickets SET redeemed=1 WHERE id=" + results[0].id + ";";
      db.query(changeRedeemVal, function (err, results) {
        var incrementReedemed = "UPDATE users SET ticketRedeemed = ticketRedeemed + 1 WHERE id=" + userUpdate + ";";
        db.query(incrementReedemed, function (err, results) {
          if(err) {
            callback(err, results);
          } else {
            callback(ticketSearchError, ticketSearchResult);
          }
        })
      })
    })
  }
  }
}