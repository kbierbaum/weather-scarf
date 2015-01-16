Weather = function(dailyAverages, numColors) {
	this.dailyAverages = dailyAverages;
	this.minAverage = Math.min.apply(Math, dailyAverages);
	this.maxAverage = Math.max.apply(Math, dailyAverages) - 1;
	this.degreesOfSeparation = (this.maxAverage - this.minAverage)/(numColors-1);

	this.getColorRange = function(dayIndex) {
		var dailyAverage = this.dailyAverages[dayIndex];
		if(dailyAverage<this.minAverage) {
			return 0;
		} else if (dailyAverage > this.maxAverage) {
			return 9;
		} else {
			return Math.floor((dailyAverage - this.minAverage)/this.degreesOfSeparation);
		}
	}
}

ColorRange = function(min, max) {
	this.min = min;
	this.max = max;
	this.numRows = 0;

	this.incrementUsage = function() {
		this.numRows++;
	}
}

ScarfRow = function(rowNumber, colorNumber) {
	this.rowNumber = rowNumber;
	this.colorNumber = colorNumber;
}

Scarf = function(dailyAverages, numColors, inchesPerPatterRow, yardsPerSkein) {
 	this.numColors = numColors;
 	this.inchesPerPatterRow = inchesPerPatterRow;
 	this.yardsPerSkein = yardsPerSkein;
 	this.weather = new Weather(dailyAverages, this.numColors);;
 	this.colorRanges = [];
 	this.scarfRows = [];

 	this.createColorRanges = function() {
		var currentMin = Number.MIN_VALUE;
		var currentMax = this.weather.minAverage + this.weather.degreesOfSeparation;
		for (var i = 0; i < this.numColors; i++) {
			this.colorRanges.push(new ColorRange(currentMin, currentMax));
			currentMin = currentMax;
			if(i === this.numColors - 2) {
				currentMax = Number.MAX_VALUE;
			} else {
				currentMax += this.weather.degreesOfSeparation;
			}
		};
	}
	this.calculateRows = function() {
		for(var i = 0; i < this.weather.dailyAverages.length; i++) {
			var colorRange = this.weather.getColorRange(i);
			this.colorRanges[colorRange].incrementUsage();
			this.scarfRows.push(new ScarfRow(i, colorRange));
		}
	}

	this.calculateYarn = function() {

 	}

 	this.createScarf = function() {
 		this.createColorRanges();
 		this.calculateRows();
		this.calculateYarn();
 	}
}

module.exports = Scarf;
