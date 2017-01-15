(function (document) {
	'use strict'
	var app = document.querySelector('#app');
	let is_crosswalk = ~navigator.userAgent.indexOf('Crosswalk');

	app.baseUrl = '/';

	if (!localStorage.is_dev && !is_crosswalk) { // if production
		app.baseUrl = '/production/booking-widget/';
	}


})(document);
