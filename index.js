/**
* Module dependencies.
*/

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var mqtt = require('mqtt')


var app = module.exports = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Register ejs as .html.
app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views

app.set('views', path.join(__dirname, 'views'));

// Path to our public directory

app.use(express.static(path.join(__dirname, 'public')));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

function RPi(id) {
    this.id = id;
    this.status = false;
    this.last_hearbeat = 0;
    this.osc_port = 5005;
    this.temperature_value = 0;
    this.temperature_interval = 5;
    this.temperature_change = false;
    this.temperature_change_threshold = 1.0;
    this.temperature_mqtt = true;
    this.temperature_osc = false;
    this.pressure_value = 0;
    this.pressure_interval = 5;
    this.pressure_change = false;
    this.pressure_change_threshold = 1.0;
    this.pressure_mqtt = true;
    this.pressure_osc = false;
    this.light_value = 0;
    this.light_interval = 5;
    this.light_change = false;
    this.light_change_threshold = 1;
    this.light_mqtt = true;
    this.light_osc = false;
    this.pedestrians_value = 0;
    this.pedestrians_interval = 5;
    this.pedestrians_change = false;
    this.pedestrians_change_threshold = 1;
    this.pedestrians_mqtt = true;
    this.pedestrians_osc = false;
}

var rpis = [];
var i;
for (i = 1; i < 10; i++) {
    rpis.push( new RPi(i) );
}

app.get('/', function(req, res){
    res.render('index', {
        rpis: rpis,
        title: "Raspberry Pi Control Panel",
        header: "Raspberry Pi Control Panel"
    });
});

app.post('/', function(req, res){

  var id = parseInt(req.body.id);

  console.log( id.toString() )

  if (id == -1) {
    if (req.body.openTab == "GlobalTab") {
      console.log("FUCK");
    } else {
      var i = parseInt(req.body.openTab.substring(3, 4));
      res.send(rpis[i-1]);
    }
    // console.log('body: ' + JSON.stringify(req.body));
  	// res.send(req.body);
  }
});



// app.post('/', function(req, res){
//
//     var id = parseInt(req.body.id);
//
//     console.log( id.toString() )
//
//     var osc_port = req.body.oscPort
//
//     var temperature_interval = req.body.temperatureInterval;
//     var temperature_change = (req.body.temperatureChange != undefined ? 1 : 0);
//     var temperature_change_threshold = req.body.temperatureChangeThreshold;
//     var temperature_mqtt = (req.body.temperatureMQTT != undefined ? 1 : 0);
//     var temperature_osc = (req.body.temperatureOSC != undefined ? 1 : 0);
//
//     var pressure_interval = req.body.pressureInterval;
//     var pressure_change = (req.body.pressureChange != undefined ? 1 : 0);
//     var pressure_change_threshold = req.body.pressureChangeThreshold;
//     var pressure_mqtt = (req.body.pressureMQTT != undefined ? 1 : 0);
//     var pressure_osc = (req.body.pressureOSC != undefined ? 1 : 0);
//
//     var light_interval = req.body.lightInterval;
//     var light_change = (req.body.lightChange != undefined ? 1 : 0);
//     var light_change_threshold = req.body.lightChangeThreshold;
//     var light_mqtt = (req.body.lightMQTT != undefined ? 1 : 0);
//     var light_osc = (req.body.lightOSC != undefined ? 1 : 0);
//
//     var pedestrians_interval = req.body.pedestriansInterval;
//     var pedestrians_change = (req.body.pedestriansChange != undefined ? 1 : 0);
//     var pedestrians_change_threshold = req.body.pedestriansChangeThreshold;
//     var pedestrians_mqtt = (req.body.pedestriansMQTT != undefined ? 1 : 0);
//     var pedestrians_osc = (req.body.pedestriansOSC != undefined ? 1 : 0);
//
//     var s = osc_port + ','
//
//     s += temperature_interval + ','
//     s += temperature_change + ','
//     s += temperature_change_threshold + ','
//     s += temperature_mqtt + ','
//     s += temperature_osc + ','
//
//     s += pressure_interval + ','
//     s += pressure_change + ','
//     s += pressure_change_threshold + ','
//     s += pressure_mqtt + ','
//     s += pressure_osc + ','
//
//     s += light_interval + ','
//     s += light_change + ','
//     s += light_change_threshold + ','
//     s += light_mqtt + ','
//     s += light_osc + ','
//
//     s += pedestrians_interval + ','
//     s += pedestrians_change + ','
//     s += pedestrians_change_threshold + ','
//     s += pedestrians_mqtt + ','
//     s += pedestrians_osc
//
//     if ( id == 0) {
//         for (i = 1; i < 10; i++) {
//             client.publish('parken/rpi/' + i + '/settings', s)
//         }
//     } else {
//         client.publish('parken/rpi/' + id + '/settings', s)
//     }
//
//     setTimeout(function() {
//         res.redirect(req.get('referer'));
//     }, 2000);
// });


// get unit timestamp
function get_time() {
    return Math.floor(new Date() / 1000);
}

var myInt = setInterval(function () {
    rpis.forEach(function(rpi) {
        if (get_time() >= rpi.last_hearbeat + 300) {
            rpi.status = false
        }
    });
}, 20000);

// MQTT stuff
var client  = mqtt.connect('mqtt://127.0.0.1')

client.on('connect', function () {
    client.subscribe('parken/rpi/+/heartbeat')
    client.subscribe('parken/rpi/+/temperature')
    client.subscribe('parken/rpi/+/pressure')
    client.subscribe('parken/rpi/+/light')
    client.subscribe('parken/rpi/+/pedestrians')
});

client.on('message', function (topic, message) {

    var hearbeat = new RegExp("parken/rpi/[0-9]+/heartbeat");
    var temperature = new RegExp("parken/rpi/[0-9]+/temperature");
    var pressure = new RegExp("parken/rpi/[0-9]+/pressure");
    var light = new RegExp("parken/rpi/[0-9]+/light");
    var pedestrians = new RegExp("parken/rpi/[0-9]+/pedestrians");

    var id = parseInt( topic.toString().split('/')[2] );

    if ( hearbeat.test(topic.toString()) ) {

        // console.log( topic + " " + message.toString() )

        rpis[id - 1].last_hearbeat = get_time();

        rpis[id - 1].status = true;

        var values = message.toString().split(',');

        rpis[id - 1].osc_port = parseInt(values[0]);

        rpis[id - 1].temperature_interval = parseInt(values[1]);
        rpis[id - 1].temperature_change = values[2] == 1;
        rpis[id - 1].temperature_change_threshold = parseFloat(values[3]);
        rpis[id - 1].temperature_mqtt = values[4] == 1;
        rpis[id - 1].temperature_osc = values[5] == 1;

        rpis[id - 1].pressure_interval = parseInt(values[6]);
        rpis[id - 1].pressure_change = values[7] == 1;
        rpis[id - 1].pressure_change_threshold = parseFloat(values[8]);
        rpis[id - 1].pressure_mqtt = values[9] == 1;
        rpis[id - 1].pressure_osc = values[10] == 1;

        rpis[id - 1].light_interval = parseInt(values[11]);
        rpis[id - 1].light_change = values[12] == 1;
        rpis[id - 1].light_change_threshold = parseInt(values[13]);
        rpis[id - 1].light_mqtt = values[14] == 1;
        rpis[id - 1].light_osc = values[15] == 1;

        rpis[id - 1].pedestrians_interval = parseInt(values[16]);
        rpis[id - 1].pedestrians_change = values[17] == 1;
        rpis[id - 1].pedestrians_change_threshold = parseInt(values[18]);
        rpis[id - 1].pedestrians_mqtt = values[19] == 1;
        rpis[id - 1].pedestrians_osc = values[20] == 1;

    } else if ( temperature.test(topic.toString()) ) {

        rpis[id - 1].temperature_value = parseFloat(message.toString());

    } else if ( pressure.test(topic.toString()) ) {

        rpis[id - 1].pressure_value = parseFloat(message.toString());

    } else if ( light.test(topic.toString()) ) {

        rpis[id - 1].light_value = parseFloat(message.toString());

    } else if ( pedestrians.test(topic.toString()) ) {

        rpis[id - 1].pedestrians_value = parseInt(message.toString());

    }
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(8080);
    console.log('Express started on port 8080');
}
