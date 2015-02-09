module.exports = [
	'$timeout',
	function ($timeout) {
		var alerts = [];

		this.create = function (opts) {
			alerts.push(opts);
			$timeout(function () {
				alerts.splice(alerts.indexOf(opts), 1);
			}, (opts.duration || 3000) + 800);
		};

		this.get = function () {
			return alerts;
		}
	}
];