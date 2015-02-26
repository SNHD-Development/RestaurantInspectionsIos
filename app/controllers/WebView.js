var args = arguments[0] || {};

$.wvMain.setUrl(args.url);
$.winWebView.title = args.title;
$.lblTitle.text = args.title;	

function btnClose_onClick(){
	$.winWebView.close();	
}

