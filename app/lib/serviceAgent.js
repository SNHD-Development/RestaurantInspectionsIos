var jsOAuth = require ('jsOAuth');
var mockData = require("mockdata");
var privateConfig;

try{
	privateConfig = require("privateconfig");
}catch(e){
}

function getAuthHeader(){
	var username = privateConfig.getData().Username;
	var password = privateConfig.getData().Password;
	var credentials = username + ':' + password;
	var authHeaderValue = 'Basic ' + Ti.Utils.base64encode(credentials);
	return authHeaderValue;
}

exports.getYelpUrl = function (restaurantName, restaurantLocation, cb){
	if (Alloy.CFG.MockDataMode){
		cb(null,mockData.getMockYelpData());
		return;
	}
	var oauth = jsOAuth.OAuth({
	    consumerKey: privateConfig.getData().YelpConsumerKey,
	    consumerSecret: privateConfig.getData().YelpConsumerSecret,
	    accessTokenKey: privateConfig.getData().YelpAccessTokenKey,
	    accessTokenSecret:privateConfig.getData().YelpAccessTokenSecret,
	});
	var url = "http://api.yelp.com/v2/search?term=" + restaurantName + "&location=" + restaurantLocation;
	oauth.get(url, function(data){
		var obj = JSON.parse(data.text);
		console.log(data.text);
		cb(null, obj);
	}, function(data){
		var err = "Error in getYelpUrl. Data: " + data;
		Alloy.Globals.Tracker.trackException({
		    description: err,
		    fatal: false
		});
		console.log(err);
		cb(data);
	});
};

exports.loadBookmarkedRestaurants = function (pnums, lat, lon, cb){
	if (Alloy.CFG.MockDataMode){
		cb(null,JSON.stringify(mockData.getMockBookmarkedRestaurants()));
		return;
	}
	var xhr = Ti.Network.createHTTPClient();
	var url = Alloy.CFG.ApiBaseUri + 'restaurant?latitude=' + lat + '&longitude=' + lon +'&pnums=' + pnums;
	xhr.open('GET', url);	
	xhr.onload = function(){
		console.log(this.responseText);
		cb(null, this.responseText);
	};
	xhr.onerror = function(e){
		var err = "Error in loadBookmarkedRestaurants. " + e.code + e.error;
		Alloy.Globals.Tracker.trackException({
		    description: err,
		    fatal: false
		});
		console.log(err);
		cb(e);
	};
	xhr.send();
};

exports.loadRestaurantsByName = function(name, lat, lon,start,end,cb){
	if (Alloy.CFG.MockDataMode){
		cb(null,JSON.stringify(mockData.getMockRestaurantsByName()));
		return;
	}
	var xhr = Ti.Network.createHTTPClient();
	var url = Alloy.CFG.ApiBaseUri + 'restaurant?latitude=' + lat + 
		'&longitude=' + lon + 
		'&start=' + start +
		'&end=' + end +
		'&name=' + name;
	xhr.open('GET', url);
	xhr.onload = function(){
		console.log(this.responseText);
		cb(null, this.responseText);
	};
	xhr.onerror = function(e){
		var err = "Error in loadRestaurantsByName. "  + e.code + e.error;
		Alloy.Globals.Tracker.trackException({
		    description: err,
		    fatal: false
		});
		console.log(err);
		cb(e);
	};
	xhr.send();
};

exports.loadNearbyRestaurants = function(lat,lon,start,end,cb){
	if (Alloy.CFG.MockDataMode){
		cb(null,JSON.stringify(mockData.getMockNearbyRestaurants()));
		return;
	}
	var xhr = Ti.Network.createHTTPClient();
	var url = Alloy.CFG.ApiBaseUri + 'restaurant?latitude=' + lat + 
		'&longitude=' + lon + 
		'&start=' + start +
		'&end=' + end;
	console.log(url);
	xhr.open('GET', url);	
	xhr.onload = function(){
		console.log(this.responseText);
		cb(null, this.responseText);
	};
	xhr.onerror = function(e){
		var err = "Error in loadNearbyRestaurants. " + e.code + e.error;
		Alloy.Globals.Tracker.trackException({
		    description: err,
		    fatal: false
		});
		console.log(err);
		cb(e);
	};
	xhr.send();
};

exports.loadRestaurantDetails = function (permitNumber, cb){
	if (Alloy.CFG.MockDataMode){
		cb(null,JSON.stringify(mockData.getMockRestaurantDetails()));
		return;
	}
	var xhr = Ti.Network.createHTTPClient();
	var url = Alloy.CFG.ApiBaseUri + 'restaurantdetail/' + permitNumber;
	xhr.open('GET', url);
	xhr.onload = function(){
		console.log(this.responseText);
		cb(null, this.responseText);
	};
	xhr.onerror = function(e){
		var err = "Error in loadRestaurantDetails. " + e.code + e.error;
		Alloy.Globals.Tracker.trackException({
		    description: err,
		    fatal: false
		});
		console.log(err);
		cb(e);
	};
	xhr.send();
};

exports.submitFeedback = function(feedback, cb){
	if (Alloy.CFG.MockDataMode){
		return cb(null);
	}
	var xhr = Ti.Network.createHTTPClient();
	var url = Alloy.CFG.InternalApiBaseUri + 'RestaurantInspectionsAppFeedback/';
	xhr.open('POST', url);
	xhr.setRequestHeader('Authorization', getAuthHeader());
	xhr.setRequestHeader('Content-Type', 'application/json');
	var payload = JSON.stringify(feedback);
	xhr.onload = function(){
		return cb(null);
	};
	xhr.onerror = function(e){
		var err = "Error in submitFeedback. Status Code: " + this.status + ', ' + e.code + e.error;
		Alloy.Globals.Tracker.trackException({
		    description: err,
		    fatal: false
		});
		console.log(err);
		cb(e);
	};
	xhr.send(payload);
};
