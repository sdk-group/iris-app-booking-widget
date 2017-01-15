'use strict';

(function (document) {
	'use strict';

	var app = document.querySelector('#app');
	var is_crosswalk = ~navigator.userAgent.indexOf('Crosswalk');

	app.baseUrl = '/';

	if (!localStorage.is_dev && !is_crosswalk) {
		// if production
		app.baseUrl = '/production/booking-widget/';
	}
})(document);
//# sourceMappingURL=interface-init.js.map
