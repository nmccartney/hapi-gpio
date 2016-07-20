'use strict';

const gpio = require('rpi-gpio');
const async = require('async');

let Status = {};
let ledHi = 35;
let ledMed = 31;
let ledLo = 29;
let ledErr = 37;

Status.setupLEDs = (cb) => {
    async.parallel([
        (callback) => {
            gpio.setup(ledHi, gpio.DIR_OUT, callback)
        },
        (callback) => {
            gpio.setup(ledMed, gpio.DIR_OUT, callback)
        },
        (callback) => {
            gpio.setup(ledLo, gpio.DIR_OUT, callback)
        },
        (callback) => {
            gpio.setup(ledErr, gpio.DIR_OUT, callback)
        },
    ], (err, results) => {
        console.log('LEDs set up');
        if(cb)cb();
    });
}

Status.closeLEDs = (cb) => {
    gpio.destroy(() => {
        console.log('Closed pins, now exit');
        if(cb)cb();
    });
}

Status.setLedStatus = (status,cb) => {
    switch(status){
        case 'high' :
            async.parallel([
                (callback) => {
                    gpio.write(ledHi, 1, callback);
                },
                (callback) => {
                    gpio.write(ledMed, 1, callback);
                },
                (callback) => {
                    gpio.write(ledLo, 1, callback);
                },
            ], function(err, results) {
                console.log('High is set');
                if(cb)cb();
            });
            break;
        case 'med' :
            async.parallel([
                (callback) => {
                    gpio.write(ledHi, 0, callback);
                },
                (callback) => {
                    gpio.write(ledMed, 1, callback);
                },
                (callback) => {
                    gpio.write(ledLo, 1, callback);
                },
            ], (err, results) => {
                console.log('High is set');
                if(cb)cb();
            });
            break;
        case 'low' : 
            async.parallel([
                (callback) => {
                    gpio.write(ledHi, 0, callback);
                },
                (callback) => {
                    gpio.write(ledMed, 0, callback);
                },
                (callback) => {
                    gpio.write(ledLo, 1, callback);
                },
            ], (err, results) => {
                console.log('High is set');
                if(cb)cb();
            });
            break;
        default:
            async.parallel([
                (callback) => {
                    gpio.write(ledErr, 0, callback);
                },
            ], (err, results) => {
                console.log('Error');
                if(cb)cb();
            });
    }
}

module.exports = Status;