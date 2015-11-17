var models = require('../models');
var bcrypt = require('bcrypt-nodejs');

module.exports = {
signin: { // Receiving calls to signin
    post: function (req, res) { // Post request
      // For this request, only userName and password are necessary
      var params = [req.body.userName, req.body.password];
      // We pass them in as params to models/index.js
      models.users.signin(params, function(err, results) {
        if (err) { 
          res.sendStatus(401);
        } else {
          // Below is a bcrypt check for hashed password use
          if ( !bcrypt.compareSync(req.body.password, results.password) ) {
            res.sendStatus(401);
          } else {
            res.send(results);
          }
        }
      });
    }
  },
  signup: { // Receiving calls to signup
    post: function (req, res) { // Post request
      // When signing up, we hash the password before sending the user info to
      // the database
      var hash = bcrypt.hashSync(req.body.password)
      var params = [req.body.userName, req.body.firstName, req.body.lastName, hash];
      // We pass the above to models/index.js
      models.users.signup(params, function (err, results){
        if (err) { 
          console.log("Signup failed!", err); 
          res.sendStatus(401) 
        } else {
          res.send(results)
        } 
      });
    }
  },
  send: { // Receiving calls to send
    post: function (req, res) { // Post request
      var params = [req.body.id, req.body.message];
      // The above gets sent to models/index.js
      models.users.send(params, function (err, results){
        if (err) {
          res.sendStatus(401);
        } else {
          res.status(201).send(results[0]);
        }
      });
    }
  },
  redeem: { // Receiving calls to redeem
    post: function (req, res) { //Post request
      var params = [req.body.id];
      //The above gets sent to models/index.js
      models.users.redeem(params, function (err, results) {
        if (err) {
          res.sendStatus(401);
        } else {
          res.status(201).send(results[0]);
        }
      });
    }
  }
}
