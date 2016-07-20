'use strict';
const gpio = require('rpi-gpio');
const async = require('async');

let lightSensor = {};
let sensorPin = 32;

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

lightSensor.get = (cb) => {
    gpio.read(sensorPin, (err, value) => {
        if (err) throw err;
        console.log('The value is ' + value);
        if(cb)cb(value);
    });
}

module.exports = lightSensor;