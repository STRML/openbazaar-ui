module.exports = [
	'$rootScope',
	'$timeout',
	function ($timeout) {
		var peers = [];

		this.add = function (peer) {
			peers.push(peer);
		};

		this.get = function () {
			return peers;
		}
	}
];