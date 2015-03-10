var serviceAgent = require('serviceAgent');
var util = require('util');

function toggleLeftWindow(){
	window.toggleLeftView();	
}

function closeLeftWindow(){
	if (window.isLeftViewOpen()){
		window.toggleLeftView();	
	}
}

var NappSlideMenu = require('dk.napp.slidemenu');
var window = NappSlideMenu.createSlideMenuWindow({
	centerWindow:$.winHome,
	leftWindow:$.leftMenu.winLeft,
	leftLedge: util.getPlatformWidthDip() - 240,
	parallaxAmount:0.2
});
window.open();

window.addEventListener('viewWillOpen', function(){
	Ti.App.fireEvent("hideSearchKeyboard");
});
   
function tweet(){
	closeLeftWindow();
	Alloy.Globals.Tracker.trackEvent({
	  category: "UserActions",
	  action: "TweetClicked",
	});
	var twitterAppUrl = "twitter://post?message=@foodapp Nice App :)";
	var twitterWebUrl = "https://twitter.com/intent/tweet?status=@SNHDinfo #restaurantgradesnv ";
	if (Ti.Platform.canOpenURL(twitterAppUrl)){
		Titanium.Platform.openURL(twitterAppUrl);	
	}else{
		Titanium.Platform.openURL(twitterWebUrl);
	}
}

$.winHome.addEventListener('close', function() {
    $.destroy();
});

function menuItemClicked(e){
	closeLeftWindow();
	if (e.viewName == "Tweet"){
		tweet();
		return;
	}
	$.lblTitle.text=e.title;
	if (e.viewName == "Nearby"){
		$.btnSearch.visible = true;
	}else{
		$.btnSearch.visible = false;	
	}

	var outgoingView = $.vContainer.children[0];
	if (outgoingView != null){
		outgoingView.animate({curve:Ti.UI.ANIMATION_CURVE_EASE_OUT,opacity:0,duration:300}, function(){
		$.vContainer.removeAllChildren();
		var incomingView = Alloy.createController(e.viewName,{}).getView();
		incomingView.opacity = 0;
		$.vContainer.add(incomingView);	
		incomingView.animate({curve:Ti.UI.ANIMATION_CURVE_EASE_IN,opacity:1,duration:300});
		
	});	
	}else{
		var incomingView = Alloy.createController(e.viewName,{}).getView();
		$.vContainer.add(incomingView);
	}
}

function toggleSearchBar(){
	Ti.App.fireEvent("searchClicked");
}

function init(){
	if (Titanium.Geolocation.locationServicesAuthorization == Titanium.Geolocation.AUTHORIZATION_DENIED){
		util.showTurnOnGeoMsg();	
	}	
	Ti.App.addEventListener('menuItemClicked', menuItemClicked);
	Ti.App.addEventListener('seeDisclaimer', function(){
		menuItemClicked({viewName: "About", title: "About"});
	});
	menuItemClicked({viewName: "Nearby", title: "Nearby Restaurants"});
	Ti.App.Properties.setBool("NetworkConnectivityWarningDisplayed", false);
	Ti.Network.addEventListener('change', function(e){
		if (e.networkType == Ti.Network.NETWORK_NONE &&
			Ti.App.Properties.getBool("NetworkConnectivityWarningDisplayed") == false){
			Ti.App.Properties.setBool("NetworkConnectivityWarningDisplayed", true);
			alert('No network is available. App may not function correctly.');
		}else{
			Ti.App.Properties.setBool("NetworkConnectivityWarningDisplayed", false);
		}
	});
}

Ti.App.addEventListener('resume', function(){
	if (Titanium.Geolocation.locationServicesAuthorization == Titanium.Geolocation.AUTHORIZATION_DENIED){
		util.showTurnOnGeoMsg();	
	}
});

init();

