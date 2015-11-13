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

  // models.users.signin
  // res.send({id: 1, userName: "Freddie", firstName: "Fred", lastName: "Zirdig", password: "This is my password",
  //           age: 40, ticketSent: 4, ticketAvailable: 2});
});

app.post('/api/user/signup', function(req, res) {
  console.log("in server.js.......",req.body);
  controllers.signup.post(req, res);
  // res.send({id: 1, userName: "Freddie", firstName: "Fred", lastName: "Zirdig", password: "This is my password",
  //           age: 40, ticketSent: 4, ticketAvailable: 2});
});

app.post('/api/tickets/send', function(req, res) {
  console.log(req.body);
  controllers.send.post(req, res);
  // res.sendStatus(201);
});

app.post('/api/tickets/redeem', function(req, res) {
  console.log(req.body);
  controllers.redeem.post(req);
  // res.send({id: 342346245});//Sends back ticket object with the unique id
});
// app.use("/api/user", router);
// app.use("api/ticket", router);

// Serve the client files
app.use(express.static(__dirname + "/client"));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}
