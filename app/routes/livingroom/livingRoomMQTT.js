// Dependencies
var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');
var request = require('request');



const client = mqtt.connect('mqtt://192.168.1.7');
var LivingRoom = require('./../../models/livingRoom');

client.on('connect', function() {
    client.subscribe("legoHouseWoonkamerInput");
});


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// more routes for our API will happen here

router.route('/mqtt/livingroom/lighton')

// get all the bears (accessed at GET http://localhost:8080/api/livingroom)
.get(function(req, res) {

    client.publish("legoHouseWoonkamerInput", "aan#");

    var formData = {
        lamp: 1,
        verwarming: "UNDEFINED",
        alarm: "UNDEFINED",
        bewegingssensor: "UNDEFINED",
        tempsensor: "UNDEFINED",
        timestamp: Date.now(),
    };
    request.post({ url: 'http://127.0.0.1:8080/api/livingroom', formData: formData }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });

    res.json({ message: 'Light turned on!' });

});

router.route('/mqtt/livingroom/lightoff')

// get all the bears (accessed at GET http://localhost:8080/api/livingroom)
.get(function(req, res) {

    client.publish("legoHouseWoonkamerInput", "uit#");

    var formData = {
        lamp: 0,
        verwarming: "UNDEFINED",
        alarm: "UNDEFINED",
        bewegingssensor: "UNDEFINED",
        tempsensor: "UNDEFINED",
        timestamp: Date.now(),
    };
    request.post({ url: 'http://127.0.0.1:8080/api/livingroom', formData: formData }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });

    res.json({ message: 'Light turned off!' });

});


module.exports = router;