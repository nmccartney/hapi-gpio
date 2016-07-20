var gpio = require('rpi-gpio');
var async = require('async');

var ledHi = 37;
var ledMed = 35;
var ledLo = 33;
var ledErr = 31;

function setupLEDs(cb){
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

function setLedStatus(status,cb){
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