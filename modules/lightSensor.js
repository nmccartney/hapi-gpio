'use strict';
const gpio = require('rpi-gpio');
const async = require('async');

let lightSensor = {};
let sensorPin = 40;

lightSensor.setup = function(cb) {
    async.parallel([
        (callback) => {
            console.log('setting up sensor');
            gpio.setup(sensorPin, gpio.DIR_IN, callback)
        },
    ], (err, results) =>{
        if (err) throw err;
        console.log('sensor set up');
        if(cb)cb();
    });
}

module.exports = lightSensor;