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
    res.json({ message: 'Light turned on!' });
});

router.route('/mqtt/livingroom/lightoff')

// get all the bears (accessed at GET http://localhost:8080/api/livingroom)
.get(function(req, res) {
    client.publish("legoHouseWoonkamerInput", "uit#");
    res.json({ message: 'Light turned off!' });
});

router.route('/mqtt/livingroom/togglelight')

// get all the bears (accessed at GET http://localhost:8080/api/livingroom)
.get(function(req, res) {

    request('http://127.0.0.1:8080/api/livingroom/latest', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var object = JSON.parse(body);
            if (object.lamp == 1) {
                client.publish("legoHouseWoonkamerInput", "uit#");
                res.json({ message: 'Light turned off!' });
            } else {
                client.publish("legoHouseWoonkamerInput", "aan#");
                res.json({ message: 'Light turned on!' });
            }
        }
    });
});


module.exports = router;