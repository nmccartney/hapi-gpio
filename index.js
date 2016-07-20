const async = require('async');

var status = require('./modules/ledStatus');
var sensor = require('./modules/lightSensor');

status.setupLEDs();

async.parallel([
    function(callback) {
        status.setupLEDs(callback);
    },
    function(callback) {
        sensor.setup(callback);
    },
], function(err, results) {
    if(err) throw err;
    console.log('GPIO pins setup and ready!');
});