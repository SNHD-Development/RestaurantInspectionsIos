var args = arguments[0] || {};

function menuItem_TouchStart(e){
	e.source.backgroundColor = '#222';
}

function menuItem_TouchEnd(e){
	e.source.backgroundColor = '#151515';
}

function menuItem_onClick(e){
	Ti.App.fireEvent('menuItemClicked', {
		viewName: e.source.viewName,
		title: e.source.children[1].text
	});
}

function ivLogo_onClick(){
	Ti.App.fireEvent('menuItemClicked', {
		viewName: 'Nearby',
		title: 'Nearby Restaurants'
	});
}
