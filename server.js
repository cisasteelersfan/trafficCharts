var keys = require('./keys');
var googleMapsClient = require('@google/maps').createClient({
    key: keys.google
});
const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, './')));

const server = require('http').createServer(app);
var CronJob = require('cron').CronJob;
var JsonDB = require('node-json-db');
var db = new JsonDB("./trafficdb", true, true);

server.listen(8081, function listening(){
    console.log('Listening on %d', server.address().port);
});
app.get('/get-data', function(req, res){
    res.send([db.getData("/traffic/dodge/0"), db.getData("/traffic/six80/0")]);
    // res.send(JSON.parse('{"data": "HEY IT WORKS OMG"}'));
});

new CronJob(' * * * * *', function(){
    var now = new Date();
    updateData(six80wp, 'six80', now);
    updateData(dodgewp, 'dodge', now);
}, null, true);

// Data - coordinates
var apt = '41.219102,-96.142177';
var work = '41.268525,-96.072238';
var six80wp = ['via:41.212383,-96.106855', 'via:41.243299,-96.085521'];
var dodgewp = ['via:41.252878,-96.138564', 'via:41.263052,-96.108504'];

var updateData = function(vias, route, time) {
    googleMapsClient.directions({
        origin: apt,
        destination: work,
        waypoints: vias,
        mode: 'driving',
        alternatives: false,
        optimize: false,
        departure_time: 'now',
    }, function(err, response){
        if(!err && response.json.status == 'OK'){
            var distance = Number(response.json.routes[0].legs[0].distance.text.slice(0, -3));
            var duration = Number(response.json.routes[0].legs[0].duration_in_traffic.text.slice(0, -5));
            var dbpath = "/traffic/"+route+"/"+String(time.getDay())+"[]";
            console.log("Pushing to: "+dbpath);
            var data = [time.getTime(), duration];
            console.log("Data: "+data);
            db.push(dbpath, data);
        }
    });
}
