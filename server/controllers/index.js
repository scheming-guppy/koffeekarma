var models = require('../models');

module.exports = {

  signin: {
    post: function (req, res) {
      var params = [req.body.userName, req.body.password];
      models.users.signin(params, function(err, results) {
        if (err) { /* do something */ }
        res.sendStatus(201);
      });
    }
  },
  signup: {
    post: function (req, res) {
     var params = [req.body.userName, req.body.firstName, req.body.lastName, req.body.password]//image??
     models.users.signup(params, function (err, results){
      if (err) { }
        res.sendStatus(201);
     });
    }
  },
  send: {
    post: function (req, res) {
      var params = [req.body.id];
        models.tickets.send(params, function (err, results){
      if (err) { }
        res.sendStatus(201);
     });
    },
    redeem: {
      post: function (req, res) {
        var params = [req.body.id];
        models.tickets.redeem(params, function (err, results){
            if (err) { }
              res.sendStatus(201)
           });
         }
      }
  };
