var express = require('express');
var db = require('./db');
// Middleware
var morgan = require('morgan');
var parser = require('body-parser');
// Router
//var router = require('./routes.js');

var app = express();

module.exports.app = app;

var port = 8000;
app.set("port", port);


// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

//Set up our routes
// app.use("/api/user", router);
// app.use("api/ticket", router);

// Serve the client files
app.use(express.static(__dirname + "/../client"));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get("port"));
  console.log("Listening on", app.get("port"));
}
