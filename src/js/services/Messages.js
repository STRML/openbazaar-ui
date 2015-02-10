module.exports = [
	'$timeout',
	function ($timeout) {
		var messages = [];

		this.incoming = function (message) {
			messages.push(message);
		};

		this.get = function () {
			return messages;
		};
	}
];
