var request = require('request');
var csv = require('csv-parse');

WeatherService = function(city, state, year){
	this.city = city;
	this.state = state;
	this.year = year;

    this.getWeather = function(callback) {
    	var lines = [];
    	var url = 'http://wunderground.com/history/city/' + this.city + '/' + this.year +'/1/1/CustomHistory.html?dayend=31&monthend=12&yearend=' 
			+ this.year + '&req_city=' + this.city + '&req_state=' + this.state + '&req_statename=' + this.state + '&MR=1&format=1';

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