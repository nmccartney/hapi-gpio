const async = require('async');

var status = require('./modules/ledStatus');
var sensor = require('./modules/lightSensor');

async.parallel([
    (callback) => {
        status.setupLEDs(callback);
    },
    (callback) => {
        sensor.setup(callback);
    },
], (err, results) => {
    if(err) throw err;
    console.log('GPIO pins setup and ready!');

    sensor.get((v)=>{
        console.log('light = ' + v);
    })
});