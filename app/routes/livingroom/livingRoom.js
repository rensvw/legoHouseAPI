// Dependencies
var express = require('express');
var router = express.Router();

// MODELS

var LivingRoom = require('./../../models/livingRoom');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// more routes for our API will happen here

router.route('/livingroom')

// create a bear (accessed at POST http://localhost:8080/api/livingroom)
.post(function(req, res) {

    var livingroom = new LivingRoom(); // create a new instance of the Bear model

    livingroom.lamp = req.body.lamp;
    livingroom.verwarming = req.body.verwarming;
    livingroom.alarm = req.body.alarm;
    livingroom.lightsensor = req.body.lightsensor;
    livingroom.tempsensor = req.body.tempsensor;
    livingroom.timestamp = req.body.timestamp;

    // save the bear and check for errors
    livingroom.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Living Room Data Point Created!' });
    });

})

// get all the bears (accessed at GET http://localhost:8080/api/livingroom)
.get(function(req, res) {
    LivingRoom.find(function(err, livingroom) {
        if (err)
            res.send(err);

        res.json(livingroom);
    });
});

router.route('/livingroom/latest')

// get the bear with that id (accessed at GET http://localhost:8080/api/livingroom/:livingroom_id)
.get(function(req, res) {
    LivingRoom.findOne({}, {}, { sort: { 'timestamp': -1 } }, function(err, livingroom) {
        if (err)
            res.send(err);
        res.json(livingroom);
    });
});

router.route('/livingroom/:livingroom_id')

// get the bear with that id (accessed at GET http://localhost:8080/api/livingroom/:livingroom_id)
.get(function(req, res) {
    LivingRoom.findById(req.params.livingroom_id, function(err, livingroom) {
        if (err)
            res.send(err);
        res.json(livingroom);
    });
})

// update the bear with this id (accessed at PUT http://localhost:8080/api/livingroom/:livingroom_id)
.put(function(req, res) {

    // use our bear model to find the bear we want
    LivingRoom.findById(req.params.livingroom_id, function(err, livingroom) {

        if (err)
            res.send(err);

        livingroom.lamp = req.body.lamp;
        livingroom.verwarming = req.body.verwarming;
        livingroom.alarm = req.body.alarm;
        livingroom.lightsensor = req.body.lightsensor;
        livingroom.tempsensor = req.body.tempsensor;
        livingroom.timestamp = req.body.timestamp;

        // save the bear
        livingroom.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Living Room Data Point Updated!' });
        });

    });
})

// delete the bear with this id (accessed at DELETE http://localhost:8080/api/livingroom/:livingroom_id)
.delete(function(req, res) {
    LivingRoom.remove({
        _id: req.params.livingroom_id
    }, function(err, livingroom) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = router;