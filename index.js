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

// Dummy users
var rpis = [
    {
        id: 1,
        status: false,
        last_hearbeat: 0,
        osc_port: 5005,
        temperature_value: 0,
        temperature_interval: 5,
        temperature_mqtt: true,
        temperature_osc: false,
        pressure_value: 0,
        pressure_interval: 5,
        pressure_mqtt: true,
        pressure_osc: false,
        light_value: 0,
        light_interval: 5,
        light_mqtt: true,
        light_osc: false,
        pedestrians_value: 0,
        pedestrians_interval: 5,
        pedestrians_mqtt: true,
        pedestrians_osc: false,
        decibel_value: 0,
        decibel_interval: 5,
        decibel_mqtt: true,
        decibel_osc: false
    },
    {
        id: 2,
        status: false,
        last_hearbeat: 0,
        osc_port: 5005,
        temperature_value: 0,
        temperature_interval: 5,
        temperature_mqtt: true,
        temperature_osc: false,
        pressure_value: 0,
        pressure_interval: 5,
        pressure_mqtt: true,
        pressure_osc: false,
        light_value: 0,
        light_interval: 5,
        light_mqtt: true,
        light_osc: false,
        pedestrians_value: 0,
        pedestrians_interval: 5,
        pedestrians_mqtt: true,
        pedestrians_osc: false,
        decibel_value: 0,
        decibel_interval: 5,
        decibel_mqtt: true,
        decibel_osc: false
    },
    {
        id: 3,
        status: false,
        last_hearbeat: 0,
        osc_port: 5005,
        temperature_value: 0,
        temperature_interval: 5,
        temperature_mqtt: true,
        temperature_osc: false,
        pressure_value: 0,
        pressure_interval: 5,
        pressure_mqtt: true,
        pressure_osc: false,
        light_value: 0,
        light_interval: 5,
        light_mqtt: true,
        light_osc: false,
        pedestrians_value: 0,
        pedestrians_interval: 5,
        pedestrians_mqtt: true,
        pedestrians_osc: false,
        decibel_value: 0,
        decibel_interval: 5,
        decibel_mqtt: true,
        decibel_osc: false
    },
    {
        id: 4,
        status: false,
        last_hearbeat: 0,
        osc_port: 5005,
        temperature_value: 0,
        temperature_interval: 5,
        temperature_mqtt: true,
        temperature_osc: false,
        pressure_value: 0,
        pressure_interval: 5,
        pressure_mqtt: true,
        pressure_osc: false,
        light_value: 0,
        light_interval: 5,
        light_mqtt: true,
        light_osc: false,
        pedestrians_value: 0,
        pedestrians_interval: 5,
        pedestrians_mqtt: true,
        pedestrians_osc: false,
        decibel_value: 0,
        decibel_interval: 5,
        decibel_mqtt: true,
        decibel_osc: false
    },
    {
        id: 5,
        status: false,
        last_hearbeat: 0,
        osc_port: 5005,
        temperature_value: 0,
        temperature_interval: 5,
        temperature_mqtt: true,
        temperature_osc: false,
        pressure_value: 0,
        pressure_interval: 5,
        pressure_mqtt: true,
        pressure_osc: false,
        light_value: 0,
        light_interval: 5,
        light_mqtt: true,
        light_osc: false,
        pedestrians_value: 0,
        pedestrians_interval: 5,
        pedestrians_mqtt: true,
        pedestrians_osc: false,
        decibel_value: 0,
        decibel_interval: 5,
        decibel_mqtt: true,
        decibel_osc: false
    },
    {
        id: 6,
        status: false,
        last_hearbeat: 0,
        osc_port: 5005,
        temperature_value: 0,
        temperature_interval: 5,
        temperature_mqtt: true,
        temperature_osc: false,
        pressure_value: 0,
        pressure_interval: 5,
        pressure_mqtt: true,
        pressure_osc: false,
        light_value: 0,
        light_interval: 5,
        light_mqtt: true,
        light_osc: false,
        pedestrians_value: 0,
        pedestrians_interval: 5,
        pedestrians_mqtt: true,
        pedestrians_osc: false,
        decibel_value: 0,
        decibel_interval: 5,
        decibel_mqtt: true,
        decibel_osc: false
    },
    {
        id: 7,
        status: false,
        last_hearbeat: 0,
        osc_port: 5005,
        temperature_value: 0,
        temperature_interval: 5,
        temperature_mqtt: true,
        temperature_osc: false,
        pressure_value: 0,
        pressure_interval: 5,
        pressure_mqtt: true,
        pressure_osc: false,
        light_value: 0,
        light_interval: 5,
        light_mqtt: true,
        light_osc: false,
        pedestrians_value: 0,
        pedestrians_interval: 5,
        pedestrians_mqtt: true,
        pedestrians_osc: false,
        decibel_value: 0,
        decibel_interval: 5,
        decibel_mqtt: true,
        decibel_osc: false
    },
    {
        id: 8,
        status: false,
        last_hearbeat: 0,
        osc_port: 5005,
        temperature_value: 0,
        temperature_interval: 5,
        temperature_mqtt: true,
        temperature_osc: false,
        pressure_value: 0,
        pressure_interval: 5,
        pressure_mqtt: true,
        pressure_osc: false,
        light_value: 0,
        light_interval: 5,
        light_mqtt: true,
        light_osc: false,
        pedestrians_value: 0,
        pedestrians_interval: 5,
        pedestrians_mqtt: true,
        pedestrians_osc: false,
        decibel_value: 0,
        decibel_interval: 5,
        decibel_mqtt: true,
        decibel_osc: false
    },
    {
        id: 9,
        status: false,
        last_hearbeat: 0,
        osc_port: 5005,
        temperature_value: 0,
        temperature_interval: 5,
        temperature_mqtt: true,
        temperature_osc: false,
        pressure_value: 0,
        pressure_interval: 5,
        pressure_mqtt: true,
        pressure_osc: false,
        light_value: 0,
        light_interval: 5,
        light_mqtt: true,
        light_osc: false,
        pedestrians_value: 0,
        pedestrians_interval: 5,
        pedestrians_mqtt: true,
        pedestrians_osc: false,
        decibel_value: 0,
        decibel_interval: 5,
        decibel_mqtt: true,
        decibel_osc: false
    }
];

app.get('/', function(req, res){
    res.render('index', {
        rpis: rpis,
        title: "Raspberry Pi Control Panel",
        header: "Raspberry Pi Control Panel",
        collapse: parseInt(req.query.coll)
    });
});

app.post('/change_global_settings', function(req, res, next){
    // req.body object has your form values

    var osc_port = req.body.oscPort

    var temperature_interval = req.body.temperatureInterval
    var temperature_mqtt = (req.body.temperatureMQTT != undefined ? 1 : 0);
    var temperature_osc = (req.body.temperatureOSC != undefined ? 1 : 0);

    var pressure_interval = req.body.pressureInterval
    var pressure_mqtt = (req.body.pressureMQTT != undefined ? 1 : 0);
    var pressure_osc = (req.body.pressureOSC != undefined ? 1 : 0);

    var light_interval = req.body.lightInterval
    var light_mqtt = (req.body.lightMQTT != undefined ? 1 : 0);
    var light_osc = (req.body.lightOSC != undefined ? 1 : 0);

    var pedestrians_interval = req.body.pedestriansInterval
    var pedestrians_mqtt = (req.body.pedestriansMQTT != undefined ? 1 : 0);
    var pedestrians_osc = (req.body.pedestriansOSC != undefined ? 1 : 0);

    var decibel_mqtt = (req.body.decibelMQTT != undefined ? 1 : 0);
    var decibel_osc = (req.body.decibelOSC != undefined ? 1 : 0);

    var s = osc_port + ','

    s += temperature_interval + ','
    s += temperature_mqtt + ','
    s += temperature_osc + ','

    s += pressure_interval + ','
    s += pressure_mqtt + ','
    s += pressure_osc + ','

    s += light_interval + ','
    s += light_mqtt + ','
    s += light_osc + ','

    s += pedestrians_interval + ','
    s += pedestrians_mqtt + ','
    s += pedestrians_osc + ','

    s += decibel_mqtt + ','
    s += decibel_osc

    for (i = 1; i < 10; i++) {
        client.publish('parken/rpi/' + i + '/settings', s)
    }

    setTimeout(function() {
        //res.redirect(req.get('referer'));
        res.redirect('/?coll=0');
    }, 2000);

});

app.post('/change_settings', function(req, res, next){
    // req.body object has your form values

    var id = parseInt(req.body.id);

    var osc_port = req.body.oscPort

    var temperature_interval = req.body.temperatureInterval
    var temperature_mqtt = (req.body.temperatureMQTT != undefined ? 1 : 0);
    var temperature_osc = (req.body.temperatureOSC != undefined ? 1 : 0);

    var pressure_interval = req.body.pressureInterval
    var pressure_mqtt = (req.body.pressureMQTT != undefined ? 1 : 0);
    var pressure_osc = (req.body.pressureOSC != undefined ? 1 : 0);

    var light_interval = req.body.lightInterval
    var light_mqtt = (req.body.lightMQTT != undefined ? 1 : 0);
    var light_osc = (req.body.lightOSC != undefined ? 1 : 0);

    var pedestrians_interval = req.body.pedestriansInterval
    var pedestrians_mqtt = (req.body.pedestriansMQTT != undefined ? 1 : 0);
    var pedestrians_osc = (req.body.pedestriansOSC != undefined ? 1 : 0);

    var decibel_mqtt = (req.body.decibelMQTT != undefined ? 1 : 0);
    var decibel_osc = (req.body.decibelOSC != undefined ? 1 : 0);

    var s = osc_port + ','

    s += temperature_interval + ','
    s += temperature_mqtt + ','
    s += temperature_osc + ','

    s += pressure_interval + ','
    s += pressure_mqtt + ','
    s += pressure_osc + ','

    s += light_interval + ','
    s += light_mqtt + ','
    s += light_osc + ','

    s += pedestrians_interval + ','
    s += pedestrians_mqtt + ','
    s += pedestrians_osc + ','

    s += decibel_mqtt + ','
    s += decibel_osc

    client.publish('parken/rpi/' + id + '/settings', s)

    setTimeout(function() {
        //res.redirect(req.get('referer'));
        res.redirect('/?coll=' + id);
    }, 2000);
});

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
    client.subscribe('parken/rpi/+/decibel')
});

client.on('message', function (topic, message) {

    var hearbeat = new RegExp("parken/rpi/[0-9]+/heartbeat");
    var temperature = new RegExp("parken/rpi/[0-9]+/temperature");
    var pressure = new RegExp("parken/rpi/[0-9]+/pressure");
    var light = new RegExp("parken/rpi/[0-9]+/light");
    var pedestrians = new RegExp("parken/rpi/[0-9]+/pedestrians");
    var decibel = new RegExp("parken/rpi/[0-9]+/decibel");

    var id = parseInt( topic.toString().split('/')[2] );

    if ( hearbeat.test(topic.toString()) ) {

        // console.log( topic + " " + message.toString() )

        rpis[id - 1].last_hearbeat = get_time();

        rpis[id - 1].status = true;

        var values = message.toString().split(',');

        rpis[id - 1].osc_port = parseInt(values[0]);

        rpis[id - 1].temperature_interval = parseInt(values[1]);
        rpis[id - 1].temperature_mqtt = values[2] == 1;
        rpis[id - 1].temperature_osc = values[3] == 1;

        rpis[id - 1].pressure_interval = parseInt(values[4]);
        rpis[id - 1].pressure_mqtt = values[5] == 1;
        rpis[id - 1].pressure_osc = values[6] == 1;

        rpis[id - 1].light_interval = parseInt(values[7]);
        rpis[id - 1].light_mqtt = values[8] == 1;
        rpis[id - 1].light_osc = values[9] == 1;

        rpis[id - 1].pedestrians_interval = parseInt(values[10]);
        rpis[id - 1].pedestrians_mqtt = values[11] == 1;
        rpis[id - 1].pedestrians_osc = values[12] == 1;

    } else if ( temperature.test(topic.toString()) ) {

        rpis[id - 1].temperature_value = parseFloat(message.toString());

    } else if ( pressure.test(topic.toString()) ) {

        rpis[id - 1].pressure_value = parseFloat(message.toString());

    } else if ( light.test(topic.toString()) ) {

        rpis[id - 1].light_value = parseFloat(message.toString());

    } else if ( pedestrians.test(topic.toString()) ) {

        rpis[id - 1].pedestrians_value = parseInt(message.toString());

    } else if ( decibel.test(topic.toString()) ) {

        rpis[id - 1].decibel_value = parseInt(message.toString());

    }
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(8080);
    console.log('Express started on port 8080');
}
