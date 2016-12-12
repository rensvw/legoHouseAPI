// app/models/bear.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var livingRoomDataPointSchema = new Schema({
    lamp: Number,
    verwarming: String,
    alarm: String,
    bewegingssensor: String,
    tempsensor: String,
    timestamp: Number
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('livingRoomDataPoint', livingRoomDataPointSchema);