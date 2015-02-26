var util = require('util');

var args = arguments[0] || {};

function init(){
	$.legendGradeA.backgroundColor = util.getGradeColor('A');
	$.legendGradeB.backgroundColor = util.getGradeColor('B');
	$.legendGradeC.backgroundColor = util.getGradeColor('C');
	$.legendGradeX.backgroundColor = util.getGradeColor('X');
	$.legendGradeP.backgroundColor = util.getGradeColor('P');
	$.legendGradeN.backgroundColor = util.getGradeColor('N');
	$.legendGradeO.backgroundColor = util.getGradeColor('O');
}

init();
