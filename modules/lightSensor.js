'use strict';
// const gpio = require('rpi-gpio');
const async = require('async');

let lightSensor = {};
let sensorPin = 40;

lightSensor.setup = function(cb) {
    async.parallel([
        function(callback) {
            console.log('setting up sensor');
        },
    ], function(err, results) {
        console.log('sensor set up');
        if(cb)cb();
    });
}

module.exports = lightSensor;