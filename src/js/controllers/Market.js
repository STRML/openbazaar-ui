module.exports = [
	'$scope',
	'Socket',
	'$routeParams',
	'Status',
	function ($scope, Socket, $routeParams, Status) {
		$scope.contracts = [];
		Status.start('Retrieving store data');
		Socket.send('query_page', {findGUID: $routeParams.id});
		Socket.send('query_store_products', {key: $routeParams.id});
		Socket.$on('page', function (event, market) {
			$scope.market = market;
			Status.endAll('Query page');
		});
		Socket.$on('store_contract', function (event, data) {
			$scope.contracts = [data.contract.contract_body.Contract]
		});
	}
];