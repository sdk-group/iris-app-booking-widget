"use strict";

(function () {
	"use strict";

	var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoid2Vid2lkZ2V0Iiwib3JpZ2luIjoidW5rbm93biIsImlhdCI6MTQ4NDAzODk3NH0.75H74Yxttjn-lpsOeSqrJhUbhcSDjV3KKQIY1oRLY1g";
	var server = "http://194.226.171.100:9002";

	var request = function request(uri, data) {
		data = data || {};
		data.token = token;
		var url = server + uri;
		return fetch(url, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(data)
		}).then(function (d) {
			return d.json();
		}).then(function (d) {
			if (!d.state) return Promise.reject(d.reason);
			return d.value;
		});
	};

	window.IRIS = window.IRIS || {};

	window.IRIS.webwidget = {
		getTerminals: function getTerminals() {
			return request('/agent/info').then(function (d) {
				return d.ws_available;
			});
		},
		getTerminalLayout: function getTerminalLayout(terminal_id) {
			return request('/terminal/bootstrap', {
				workstation: terminal_id
			}).then(function (d) {
				console.log(d);
				return d.views;
			});
		},
		getTerminalFields: function getTerminalFields(terminal_id) {
			return request('/terminal/bootstrap', {
				workstation: terminal_id
			}).then(function (d) {

				return _.map(d.workstation.custom_fields, function (field, key) {
					field.key = key;
					return field;
				});
			});
		},
		getAvailableDays: function getAvailableDays(ticket_query) {
			return request('/prebook/available-days', ticket_query).then(function (d) {
				return d.days;
			});
		},
		getDaySlots: function getDaySlots(ticket_query) {
			return request('/prebook/ticket-observe', ticket_query).then(function (d) {
				return d.slots;
			});
		},
		confirmTicket: function confirmTicket(ticket_query) {
			return request('/prebook/ticket-confirm', ticket_query);
		}
	};
})();
//# sourceMappingURL=webwidget-api.js.map
