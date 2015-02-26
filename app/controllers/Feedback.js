var serviceAgent = require('serviceAgent');
var util = require('util');
var args = arguments[0] || {};

function btnClose_onClick(){
	$.Feedback.close();	
}

function svForm_onClick(){
	unhideKeyboard();
}

function btn_onTouchstart(e){
	e.source.backgroundGradient = {
		type:'linear',
		colors:[{color:"#029517",position:0.0},{color:"#027b13",position:1.0}]
	};
}

function btn_onTouchend(e){
	e.source.backgroundGradient = {
		type:'linear',
		colors:[{color:"#03A319",position:0.0},{color:"#03A319",position:1.0}]
	};
}

function unhideKeyboard(){
	$.tfName.blur();
	$.tfEmail.blur();
	$.taFeedback.blur();
}

function textField_onClick(e){
	e.cancelBubble = true;
}

function btnSubmit_onClick(){
	unhideKeyboard();
	Alloy.Globals.Loader.show();
	serviceAgent.submitFeedback({
		name: $.tfName.value,
		email: $.tfEmail.value,
		restaurantName: args.restaurant.name,
		restaurantLoc: args.restaurant.address + ' ' + args.restaurant.zipCode,
		feedback: $.taFeedback.value
	}, function(err, data){
		Alloy.Globals.Loader.hide();
		if (err == null){
			$.submitResult.text = "SENT";
			$.submitResult.backgroundColor = "#05B31D";
			$.svForm.animate({curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,opacity:.25,duration:300});
			$.submitResult.animate({curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,opacity:1.0,duration:300},function(e){
				setTimeout(function(){
					$.submitResult.opacity = 0;
					$.Feedback.close();
				}, 2000);
			});
		}else{
			$.submitResult.text = "ERROR";
			$.submitResult.backgroundColor = "#df344c";
			$.svForm.animate({curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,opacity:.25,duration:300});
			$.submitResult.animate({curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,opacity:1.0,duration:300},function(e){
				setTimeout(function(){
					$.submitResult.animate({curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,opacity:0,duration:300});
					$.svForm.animate({curve:Ti.UI.ANIMATION_CURVE_EASE_IN_OUT,opacity:1,duration:300});
				}, 2000);
			});
		}
	});
}

function init(){
	$.submitResult.top = util.getTopToCenter($.submitResult.height);
	$.submitResult.left = util.getLeftToCenter($.submitResult.width);
	$.lblRestaurantName.text = args.restaurant.name;
}

init();
