var serviceAgent = require('serviceAgent');
var util = require('util');
var restaurants = Alloy.Collections.restaurants;

var args = arguments[0] || {};

Alloy.Globals.Tracker.trackScreen({
  screenName: "Nearby Restaurants"
});

function refreshRestaurantSummary(data,append){
	if (_.isNull(data)){
		return;
	}
	var d = JSON.parse(data);
	var models = util.getRestaurantModels(d);
	if (append){
		restaurants.add(models, {silent: true});
		restaurants.trigger('change');
		$.lvSummary.setMarker({sectionIndex:0, itemIndex:(restaurants.length - 1)});
	}else{
		restaurants.reset(models);
	}
	
	if (restaurants.length == 0){
		$.lblNoResults.setVisible(true);
	}else{
		$.lblNoResults.setVisible(false);
	}
	Alloy.Globals.Loader.hide();
}

function getRestaurantPidList(){
	var ds = [];
	for (var i=0; i < restaurants.length; i++){
		ds.push(restaurants.at(i).get("permitNumber"));
	}
	return ds;
}

function lvSummary_onItemclick(e){
	$.sbRestaurantSearch.blur();
	var restaurant = restaurants.at(e.itemIndex);
	Alloy.Globals.Loader.show();
	serviceAgent.loadRestaurantDetails(restaurant.get('permitNumber'), function(err, data){
		Alloy.Globals.Loader.hide();
		if (_.isNull(data))
			return;
		var d = JSON.parse(data);
		var view = Alloy.createController('RestaurantDetail',{
			restaurantDetail: d,
			pidList: getRestaurantPidList(),
			currIdx: e.itemIndex
		}).getView();
		$.lvSummary.deselectItem(e.selectionIndex, e.itemIndex);
		view.open({transition:Ti.UI.iPhone.AnimationStyle.NONE});
	});
}

function lvSummary_onPull(){
	// somehow required for the pullend to work
}

function lvSummary_onPullend(){
	restaurants.reset([]);
	util.getLatLon(function(err, loc){
		drawMap(loc);
	});
	loadNearbyRestaurants();
}

function searchHandler(e){
	Alloy.Globals.Loader.show();
	var searchTerm = $.sbRestaurantSearch.getValue();
	$.sbRestaurantSearch.blur();
	if (searchTerm == '' || searchTerm == null){
		return;
	}
	Alloy.Globals.Tracker.trackEvent({
	  category: "UserActions",
	  action: "Searched",
	});
	$.lvSummary.removeEventListener('marker', loadNearbyRestaurants);
	util.getLatLon(function(err, loc){
		serviceAgent.loadRestaurantsByName(searchTerm,loc.lat, loc.lon,0,30,function(err, data){
			Alloy.Globals.Loader.hide();
			if (err != null){
				return;
			}
			refreshRestaurantSummary(data,false);
		});	
	});
}

function sbRestaurantSearch_onChange(){
	if (_.isNull($.sbRestaurantSearch.getValue()) || $.sbRestaurantSearch.getValue() == ''){
		$.sbRestaurantSearch.blur();
		loadNearbyRestaurants();
	}
}

function btnSearchCancel_onClick(){
	$.sbRestaurantSearch.setValue("");
	$.sbRestaurantSearch.blur();
}

function lblDisclaimer_onClick(){
	Ti.App.Properties.setBool("disclaimerViewed", true);
	Ti.App.fireEvent("seeDisclaimer");
}

function loadNearbyRestaurants(){
	var i = restaurants.length;
	console.log(i);
	if (i > 100)
		return;
	Alloy.Globals.Loader.show();
	util.getLatLon(function(err, loc){
		if (err){
			// redraw map (default loc will be rendered)
			drawMap(loc);
		}
		serviceAgent.loadNearbyRestaurants(loc.lat, loc.lon, i, 30, function(err, data){		
			if (err != null){
				return;
			}
			refreshRestaurantSummary(data,true);
		});
	});
}

function drawMap(loc){
    $.aCurrentLoc.latitude = loc.lat;
    $.aCurrentLoc.longitude = loc.lon;
    $.aCurrentLoc.title = "Your current location";
    $.mapview.region = {latitude:loc.lat, longitude:loc.lon,
        latitudeDelta:0.01, longitudeDelta:0.01};
    $.mapview.annotations = [$.aCurrentLoc];
}

function init(){
	restaurants.reset([]);
	if (!Ti.App.Properties.hasProperty('disclaimerViewed')){
		$.lblDisclaimer.visible = true;
	}
	$.vSearchContainer.visibleToUser = false;
	util.getLatLon(function(err, loc){
		drawMap(loc);
	});
	loadNearbyRestaurants();
	Ti.App.addEventListener('searchClicked', function(){
		if ($.vSearchContainer.visibleToUser){
			$.vSearchContainer.animate({curve:Ti.UI.ANIMATION_CURVE_EASE_OUT,top:-40,duration:300},function(e){
				$.vSearchContainer.visibleToUser = false;
				$.sbRestaurantSearch.blur();
			});
		}else{
			$.vSearchContainer.animate({curve:Ti.UI.ANIMATION_CURVE_EASE_IN,top:0,duration:300},function(e){
				$.vSearchContainer.visibleToUser = true;
				$.sbRestaurantSearch.focus();
			});
		}
	});
	Ti.App.addEventListener('hideSearchKeyboard', function(){
		$.sbRestaurantSearch.blur();
	});
	$.lvSummary.addEventListener('marker',loadNearbyRestaurants);
}
init();
