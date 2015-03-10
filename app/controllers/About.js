var args = arguments[0] || {};
var util = require('util');

Alloy.Globals.Tracker.trackScreen({
  screenName: "About"
});

function init(){
	$.lblMain.width = util.getPlatformWidthDip() - 40;
	$.lblMain.text = "The health district conducts unannounced inspections of food " +
	"establishments at least once a year. Inspections are posted online approximately 5 " +
	"business days* following the inspection.";
	$.lblMain.text += "\n";
	$.lblMain.text += "\n";
	$.lblMain.text += "These records provide a \"snapshot\" of the day and time of the " +
	"inspection. An inspection conducted on any given day may not be representative of the " +
	"overall, long-term cleanliness of an establishment. The conditions and " + 
	"violations documented during a food establishment inspection may have been " + 
	"corrected since the last date of inspection. New violations may have developed " + 
	"since the last inspection.";
	$.lblMain.text += "\n";
	$.lblMain.text += "\n";
	$.lblMain.text += "The health district does not guarantee the accuracy of the " +
	"information reported on this application, and disclaims liability for any errors. " +
	"We reserve the right to make changes to this website at any time without notice.";
	$.lblMain.text += "\n";
	$.lblMain.text += "\n";
	$.lblMain.text += "*Note: Some records may not appear in the Restaurant Inspections " +
	"Search for up to 60 days due to an upgrade of our computer systems. Submit a Public " +
	"Records Request if you are unable to locate a specific inspection record.";
}

init();
