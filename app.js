/* app.js */

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://127.0.0.1')

client.on('connect', function () {
  client.subscribe('parken/rpi/1/heartbeat')
  client.subscribe('parken/rpi/2/heartbeat')
  client.subscribe('parken/rpi/3/heartbeat')
  client.subscribe('parken/rpi/4/heartbeat')
  client.subscribe('parken/rpi/5/heartbeat')
  client.subscribe('parken/rpi/6/heartbeat')
  client.subscribe('parken/rpi/7/heartbeat')
  client.subscribe('parken/rpi/8/heartbeat')
  client.subscribe('parken/rpi/9/heartbeat')
})
 
client.on('message', function (topic, message) {
  // message is Buffer 
  console.log(message.toString())
  
  var id = -1
  
  if (topic.toString() == 'parken/rpi/1/heartbeat') {
    id = 0
  } else if (topic.toString() == 'parken/rpi/2/heartbeat') {
    id = 1
  } else if (topic.toString() == 'parken/rpi/3/heartbeat') {
    id = 2
  } else if (topic.toString() == 'parken/rpi/4/heartbeat') {
    id = 3
  } else if (topic.toString() == 'parken/rpi/5/heartbeat') {
    id = 4
  } else if (topic.toString() == 'parken/rpi/6/heartbeat') {
    id = 5
  } else if (topic.toString() == 'parken/rpi/7/heartbeat') {
    id = 6
  } else if (topic.toString() == 'parken/rpi/8/heartbeat') {
    id = 7
  } else if (topic.toString() == 'parken/rpi/9/heartbeat') {
    id = 8
  }

  console.log(id.toString())

  rpis[id].status = 'online'
  rpis[id].colour = 'background-color:#ededed'

  var values = message.toString().split(',')

  console.log()

  rpis[id].sensor_interval = parseInt(values[0])
  rpis[id].osc_port = parseInt(values[1])
  
  if (values[2] == 0) {
    rpis[id].mqtt_temp = ''
  } else {
    rpis[id].mqtt_temp = 'checked'
  }
  
  if (values[3] == 0) {
    rpis[id].mqtt_pressure = ''
  } else {
    rpis[id].mqtt_pressure = 'checked'
  }
  
  if (values[4] == 0) {
    rpis[id].mqtt_light = ''
  } else {
    rpis[id].mqtt_light = 'checked'
  }
  
  if (values[5] == 0) {
    rpis[id].mqtt_pedestrians = ''
  } else {
    rpis[id].mqtt_pedestrians = 'checked'
  }
  
  if (values[6] == 0) {
    rpis[id].osc_temp = ''
  } else {
    rpis[id].osc_temp = 'checked'
  }
  
  if (values[6] == 0) {
    rpis[id].osc_pressure = ''
  } else {
    rpis[id].osc_pressure = 'checked'
  }
  
  if (values[7] == 0) {
    rpis[id].osc_light = ''
  } else {
    rpis[id].osc_light = 'checked'
  }
  
  if (values[8] == 0) {
    rpis[id].osc_pedestrians = ''
  } else {
    rpis[id].osc_pedestrians = 'checked'
  }
})

// require and instantiate express
const app = require('express')()

var rpis = [
  {
    id: 1,
    status: 'offline',
    colour: 'background-color:#ff6a6a',
    collapse: '#collapse1',
    collapseId: 'collapse1',
    sensor_interval: 5,
    osc_port: 5005,
    mqtt_temp: 'checked',
    mqtt_pressure: 'checked',
    mqtt_light: 'checked',
    mqtt_pedestrians: 'checked',
    osc_temp: '',
    osc_pressure: '',
    osc_light: '',
    osc_pedestrians: ''
  },
  {
    id: 2,
    status: 'offline',
    colour: 'background-color:#ff6a6a',
    collapse: '#collapse2',
    collapseId: 'collapse2',
    sensor_interval: 5,
    osc_port: 5005,
    mqtt_temp: 'checked',
    mqtt_pressure: 'checked',
    mqtt_light: 'checked',
    mqtt_pedestrians: 'checked',
    osc_temp: '',
    osc_pressure: '',
    osc_light: '',
    osc_pedestrians: ''
  },
  {
    id: 3,
    status: 'offline',
    colour: 'background-color:#ff6a6a',
    collapse: '#collapse3',
    collapseId: 'collapse3',
    sensor_interval: 5,
    osc_port: 5005,
    mqtt_temp: 'checked',
    mqtt_pressure: 'checked',
    mqtt_light: 'checked',
    mqtt_pedestrians: 'checked',
    osc_temp: '',
    osc_pressure: '',
    osc_light: '',
    osc_pedestrians: ''
  },
  {
    id: 4,
    status: 'offline',
    colour: 'background-color:#ff6a6a',
    collapse: '#collapse4',
    collapseId: 'collapse4',
    sensor_interval: 5,
    osc_port: 5005,
    mqtt_temp: 'checked',
    mqtt_pressure: 'checked',
    mqtt_light: 'checked',
    mqtt_pedestrians: 'checked',
    osc_temp: '',
    osc_pressure: '',
    osc_light: '',
    osc_pedestrians: ''
  },
  {
    id: 5,
    status: 'offline',
    colour: 'background-color:#ff6a6a',
    collapse: '#collapse5',
    collapseId: 'collapse5',
    sensor_interval: 5,
    osc_port: 5005,
    mqtt_temp: 'checked',
    mqtt_pressure: 'checked',
    mqtt_light: 'checked',
    mqtt_pedestrians: 'checked',
    osc_temp: '',
    osc_pressure: '',
    osc_light: '',
    osc_pedestrians: ''
  },
  {
    id: 6,
    status: 'offline',
    colour: 'background-color:#ff6a6a',
    collapse: '#collapse6',
    collapseId: 'collapse6',
    sensor_interval: 5,
    osc_port: 5005,
    mqtt_temp: 'checked',
    mqtt_pressure: 'checked',
    mqtt_light: 'checked',
    mqtt_pedestrians: 'checked',
    osc_temp: '',
    osc_pressure: '',
    osc_light: '',
    osc_pedestrians: ''
  },
  {
    id: 7,
    status: 'offline',
    colour: 'background-color:#ff6a6a',
    collapse: '#collapse7',
    collapseId: 'collapse7',
    sensor_interval: 5,
    osc_port: 5005,
    mqtt_temp: 'checked',
    mqtt_pressure: 'checked',
    mqtt_light: 'checked',
    mqtt_pedestrians: 'checked',
    osc_temp: '',
    osc_pressure: '',
    osc_light: '',
    osc_pedestrians: ''
  },
  {
    id: 8,
    status: 'offline',
    colour: 'background-color:#ff6a6a',
    collapse: '#collapse8',
    collapseId: 'collapse8',
    sensor_interval: 5,
    osc_port: 5005,
    mqtt_temp: 'checked',
    mqtt_pressure: 'checked',
    mqtt_light: 'checked',
    mqtt_pedestrians: 'checked',
    osc_temp: '',
    osc_pressure: '',
    osc_light: '',
    osc_pedestrians: ''
  },
  {
    id: 9,
    status: 'offline',
    colour: 'background-color:#ff6a6a',
    collapse: '#collapse9',
    collapseId: 'collapse9',
    sensor_interval: 5,
    osc_port: 5005,
    mqtt_temp: 'checked',
    mqtt_pressure: 'checked',
    mqtt_light: 'checked',
    mqtt_pedestrians: 'checked',
    osc_temp: '',
    osc_pressure: '',
    osc_light: '',
    osc_pedestrians: ''
  }
]

// set the view engine to ejs
app.set('view engine', 'ejs')

// blog home page
app.get('/', (req, res) => {
  // render `home.ejs` with the list of posts
  res.render('index', { rpis: rpis })
})

app.post('/change_settings', function(req,res) {
  //var id = req.body.id
  //client.subscribe('parken/rpi/1/heartbeat')
})

app.listen(8080)

console.log('listening on port 8080')