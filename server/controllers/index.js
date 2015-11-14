var models = require('../models');

module.exports = {

  signin: {
    post: function (req, res) {
      console.log("In post woooooo");
      var params = [req.body.userName, req.body.password];
      models.users.signin(params, function(err, results) {
        if (err) { 
          res.sendStatus(401)
        } else {
          if ( results.password === req.body.password ) {
            console.log( "successfuly signin after pw check" );
          }
          console.log("results from controller signin", results);
          res.send(results);

        }
        // res.sendStatus(201);
        // need to hash req.body.password here and then compare to the
        // results password
      });
    }
  },
  signup: {
    post: function (req, res) {
      console.log("In the controller signup function........", req.body)
     var params = [req.body.userName, req.body.firstName, req.body.lastName, req.body.password]//image??
     models.users.signup(params, function (err, results){
      console.log("This is results.....", results)
      // if ( results === false ) { err = true; }
      if (err) { 
        console.log("Signup failed!", err); 
        res.sendStatus(401) 
      } else {

      console.log("Is this wroking headers")
      console.log("This is a signup attempt that shoudl work", results)
      // res.sendStatus(201);
      res.send(results)
      } 

     });
    }
  },
  send: {
    post: function (req, res) {
      var params = [req.body.id, req.body.message];
      console.log("params in controllers", params)
      models.users.send(params, function (err, results){
        if (err) {
          res.sendStatus(401);
        } else {
          res.sendStatus(201);
        }
      });
    }
  },
  redeem: {
    post: function (req, res) {
      console.log("This is req.body.id...", req.body.id)
      var params = [req.body.id];
      console.log('params in controllers', params)
      models.users.redeem(params, function (err, results) {
        if (err) {
          res.sendStatus(401);
        } else {
          res.sendStatus(201);
        }
          // res.sendStatus(201);
      });
    }
  }
}