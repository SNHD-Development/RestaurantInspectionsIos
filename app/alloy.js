// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

var util = require('util');
Alloy.Globals.Map = require('ti.map');

Alloy.Collections.restaurants = new Backbone.Collection();
Alloy.Collections.inspections = new Backbone.Collection();
Alloy.Globals.Loader = Alloy.createWidget('com.caffeinalab.titanium.loader', {
    message: "Loading...",
    cancelable: true,
    useImages: false
});
Alloy.Globals.ViolationsLabelWidth = util.getPlatformWidthDip() - 75;
Alloy.Globals.RestaurantDetailTitleWidth = util.getPlatformWidthDip() - 50;
