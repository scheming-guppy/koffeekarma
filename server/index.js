var models = require('../models');

module.exports = {

  users: {
    get: function (req, res) {
      models.users.get(function(err, results) {
        if (err) { /* do something */ }
        res.json(results);
      });
    },
    post: function (req, res) {
      var params = [req.body.userName, req.body.firstName, req.body.lastName, req.body.password, req.body.ticketSent, req.body.ticketAvailable];
      models.users.post(params, function(err, results) {
        if (err) { /* do something */ }
        res.sendStatus(201);
      });
    }
  },

  tickets: {
    get: function (req, res) {
      models.tickets.get(function(err, results) {
        if (err) { /* do something */ }
        res.json(results);
      });
    },
    post: function (req, res) {
      var params = [req.body.redeemed, req.body.sentBy, req.body.receivedBy, req.body.sentAt, req.body.message];
      models.tickets.post(params, function(err, results) {
        if (err) { /* do something */ }
        res.sendStatus(201);
      });
    }
  }
  };
