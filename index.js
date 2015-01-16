/**
 * Module dependencies.
 */

var express = require('express');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var scarf = require('./models/scarf');
var weather = require('./models/weather');

var app = module.exports = express();
app.use(bodyParser.json());

app.get('/scarf', function(req, res) {
	console.log(req);
	var weather = new WeatherService('Boulder', 'CO', '2014');
	weather.getWeather(function(data) {
		var scarf = new Scarf(data, 10, 70, 160);
		scarf.createScarf();
 		res.json(scarf);
	})
	
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
