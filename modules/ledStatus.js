'use strict';

// const gpio = require('rpi-gpio');
const async = require('async');

let Status = {};
let ledHi = 37;
let ledMed = 35;
let ledLo = 33;
let ledErr = 31;

Status.start = function() {
    console.log('hello')
}

Status.setupLEDs = function(cb){
    async.parallel([
        function(callback) {
            gpio.setup(ledHi, gpio.DIR_OUT, callback)
        },
        function(callback) {
            gpio.setup(ledMed, gpio.DIR_OUT, callback)
        },
        function(callback) {
            gpio.setup(ledLo, gpio.DIR_OUT, callback)
        },
        function(callback) {
            gpio.setup(ledErr, gpio.DIR_OUT, callback)
        },
    ], function(err, results) {
        console.log('LEDs set up');
        if(cb)cb();
    });
}

Status.closeLEDs = function(cb){
    gpio.destroy(function() {
        console.log('Closed pins, now exit');
        if(cb)cb();
    });
}

Status.setLedStatus = function(status,cb){
    switch(status){
        case 'high' :
            async.parallel([
                function(callback) {
                    gpio.write(ledHi, 1, callback);
                },
                function(callback) {
                    gpio.write(ledMed, 1, callback);
                },
                function(callback) {
                    gpio.write(ledLo, 1, callback);
                },
            ], function(err, results) {
                console.log('High is set');
                if(cb)cb();
            });
            break;
        case 'med' :
            async.parallel([
                function(callback) {
                    gpio.write(ledHi, 0, callback);
                },
                function(callback) {
                    gpio.write(ledMed, 1, callback);
                },
                function(callback) {
                    gpio.write(ledLo, 1, callback);
                },
            ], function(err, results) {
                console.log('High is set');
                if(cb)cb();
            });
            break;
        case 'low' : 
            async.parallel([
                function(callback) {
                    gpio.write(ledHi, 0, callback);
                },
                function(callback) {
                    gpio.write(ledMed, 0, callback);
                },
                function(callback) {
                    gpio.write(ledLo, 1, callback);
                },
            ], function(err, results) {
                console.log('High is set');
                if(cb)cb();
            });
            break;
        default:
            async.parallel([
                function(callback) {
                    gpio.write(ledErr, 0, callback);
                },
            ], function(err, results) {
                console.log('Error');
                if(cb)cb();
            });
    }
}

module.exports = Status;