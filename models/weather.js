var config = require('../config')
var request = require('request');
var csv = require('csv-parse');

WeatherService = function(zip, year){
	this.zip = zip;
	this.year = year;

	this.getAirportCode = function(airportCallback, callback) {
		var url = 'http://api.wunderground.com/api/' + config.wunderground.apikey 
			+ '/geolookup/q/' + this.zip + '.json';
		request(url, function (error, response, body) {
  			if (!error && response.statusCode == 200) {
    			var response = JSON.parse(body);
    			airportCallback(response.location.nearby_weather_stations.airport.station[0].icao, callback);
  			}
		});
	}

    this.getWeather = function(callback) {
    	this.getAirportCode(this.airportCallback, callback);
	
	}

	this.airportCallback = function(airportCode, callback) {
		var lines = [];
		var url = 'http://wunderground.com/history/airport/' + airportCode + '/2014' 
			+ '/1/1/CustomHistory.html?dayend=31&monthend=12&yearend=2014' 
			+ '&MR=1&format=1';
		var parser = csv({});
		parser.on('readable', function(){
			while(record = parser.read()){
				lines.push(record);
			}
		})
		parser.on('end', function() {
			lines.splice(0, 2);
			lines = lines.map(function(line) {
				return line[2]; //mean column
			});
			console.log(lines);
			callback(lines);
		})
		parser.on('error', function(e) {
			console.log(e);
		});

		request(url).pipe(parser);
	}
}

module.exports = WeatherService;