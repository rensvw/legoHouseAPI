// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:xENWIbiNIMBZ0xi@ds119548.mlab.com:19548/legohouse'); // connect to our databa

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', require('./app/routes/api'), require('./app/routes/livingroom/livingRoom'), require('./app/routes/livingroom/livingRoomMQTT'));


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);