module.exports = [
	'$scope',
	'$location',
	'Peers',
	function ($scope, $location, Peers) {
		$scope.peers = Peers.get();

		$scope.openMarket = function(guid) {
			$location.path('/browse/market/' + guid);
		};
	}
];