var express = require('express');
var db = require('./server/db');
// Middleware
var morgan = require('morgan');
var parser = require('body-parser');
var controllers = require('./server/controllers');
// Router
//var router = require('./routes.js');

var app = express();

module.exports.app = app;

var port = process.env.PORT || 8000;
app.set("port", port);


// Logging and parsing


app.use(morgan('dev'));
app.use(parser.json());

//Set up our routes
app.post('/api/user/signin', function(req, res) {
  controllers.signin.post(req, res);
});

app.post('/api/user/signup', function(req, res) {
  controllers.signup.post(req, res);
});

app.post('/api/tickets/send', function(req, res) {
  controllers.send.post(req, res);
});

app.post('/api/tickets/redeem', function(req, res) {
  controllers.redeem.post(req, res);
});

// Serve the client files
app.use(express.static(__dirname + "/client"));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}
