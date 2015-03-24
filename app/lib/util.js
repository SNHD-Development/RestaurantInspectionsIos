var moment = require('alloy/moment');

exports.getLatLon = function(cb){
	if (ENV_DEVELOPMENT)
		return cb(false,{lat: Alloy.CFG.DefaultLat, lon: Alloy.CFG.DefaultLon});

	Titanium.Geolocation.getCurrentPosition(function(e){
		if (!e.success || e.error){
			console.log('Geolocation Error - ');
			console.log(e);
			return cb(true, {lat: Alloy.CFG.DefaultLat, lon: Alloy.CFG.DefaultLon});
		}
		return cb(false, {lat: e.coords.latitude, lon: e.coords.longitude});
	});
};

exports.showTurnOnGeoMsg = function(){
	Titanium.UI.createAlertDialog({
		title:'Geolocation turned off', 
		message:'Please enable geolocation for this app to get accurate results.',
		buttonNames: ['Ok']}).show();
};

exports.getGradeColor = function(grade){
	switch(grade){
		case 'A':
			return Alloy.CFG.GradeA;
		case 'O':
			return Alloy.CFG.GradeO;
		case 'B':
			return Alloy.CFG.GradeB;
		case 'P':
			return Alloy.CFG.GradeP;
		case 'X':
			return Alloy.CFG.GradeX;
		case 'N':
			return Alloy.CFG.GradeN;	
		default:
			return Alloy.CFG.GradeC;
	}	
};

exports.getTopToCenter = function(height){
	return (exports.getPlatformHeightDip() - height) / 2;
};

exports.getLeftToCenter = function(width){
	return (exports.getPlatformWidthDip() - width) / 2;
};

exports.getPlatformWidthDip = function(){
	if (OS_IOS){
		return Titanium.Platform.displayCaps.platformWidth;
	}else if (OS_ANDROID){
		return exports.convertPixelsToDip(Titanium.Platform.displayCaps.platformWidth);
	}
};

exports.getPlatformHeightDip = function(){
	if (OS_IOS){
		return Titanium.Platform.displayCaps.platformHeight;
	}else if (OS_ANDROID){
		return exports.convertPixelsToDip(Titanium.Platform.displayCaps.platformHeight);
	}
};

exports.convertPixelsToDip = function(pixels){
	return pixels / (Titanium.Platform.displayCaps.dpi / 160);
};

exports.getRestaurantModels = function(d){
	var ds = [];
	for (var i=0; i < d.length; i++){
		if (!d[i].current_grade || !d[i].permit_number)
			continue;
		
		d[i].current_grade = d[i].current_grade.toUpperCase();	
		var demerits = d[i].current_demerits;
		var demeritsText = demerits == 0 ? 'No demerits' : demerits + ' demerits';
		var lastInspectedText = _.isNull(d[i].date_current) ? '' : 'Inspected on ' + moment(d[i].date_current).format('l');
		var milesAwayText = _.isNull(d[i].dist) ? '' : d[i].dist.toFixed(1) + ' mi';
		var locationText = _.isNull(d[i].address) ? milesAwayText : milesAwayText + ' · ' + d[i].address;
		var thirdLineText = lastInspectedText == '' ? demeritsText : demeritsText + ' · ' + lastInspectedText;
		var restaurant = new Backbone.Model({
			name: d[i].restaurant_name, 
			grade: d[i].current_grade, 
			demerits: demeritsText,
			thirdLine: thirdLineText,
			location: locationText,
			gradeColor: util.getGradeColor(d[i].current_grade),
			permitNumber: d[i].permit_number
		});
		ds.push(restaurant);
	}
	return ds;
};

