var angular = require('angular')

require('jquery');
require('ngRoute')
require('ngRouteSegment')
require('ngAnimate')
require('bootstrap')
require('bootstrap-tpls')
require('identicon')

window.win = gui.Window.get();

var app = angular.module('obApp', [
	'ngRoute',
	'ngAnimate',
	'route-segment',
	'view-segment',
	'ui.bootstrap',
])

app.config(function ($routeProvider, $routeSegmentProvider, $locationProvider) {
	$routeSegmentProvider
		.when('/labs', 'labs')
		.when('/home', 'home')
		.when('/store', 'store')

		.when('/messages', 'messages')
		.when('/messages/:id', 'messages.message')
		.when('/settings', 'settings')
		.when('/browse', 'browse')
		.when('/browse/market/:id', 'browse.market')

	$routeSegmentProvider
		.segment('labs', {
			default: true,
			templateUrl: 'templates/labs.html',
			controller: 'LabsController'
		})
		.segment('home', {
			default: true,
			templateUrl: 'templates/home.html',
			controller: 'HomeController'
		})
		.segment('store', {
			templateUrl: 'templates/store.html'
		})
			.within()
			.segment('overview', {
				default: true,
				templateUrl: 'templates/store/overview.html',
				controller: function () { console.log('store overview') }
			})
			.segment('contracts', {
				templateUrl: 'templates/store/contracts.html',
				controller: function () { console.log('store contracts') }
			})
			.up()
		.segment('messages', {
			templateUrl: 'templates/messages.html'
		})
			.within()
			.segment('overview', {
				default: true,
				templateUrl: 'templates/messages/overview.html',
				controller: function($scope, $location) {
					$scope.open = function () { $location.path('/messages/someid'); }
				}
			})
			.segment('message', {
				templateUrl: 'templates/messages/message.html',
				controller: function() { console.log('message'); },
				dependencies: ['id']
			})
			.up()
		.segment('settings', {
			templateUrl: 'templates/settings.html',
			controller: 'SettingsController'
		})
		.segment('browse', {
			templateUrl: 'templates/browse.html',
		})
			.within()
			.segment('overview', {
				default: true,
				templateUrl: 'templates/browse/overview.html',
				controller: 'BrowseController'
			})
			.segment('market', {
				templateUrl: 'templates/browse/market.html',
				controller: 'MarketController'
			})
			.up()
			// .within()
			// .segment('overview', {
			// 	default: true,
			// 	templateUrl: 'templates/settings/overview.html',
			// 	controller: function() { console.log('settings'); }
			// })
			// .up()

	$routeProvider.otherwise('/home')
})

app.controller('AppController', require('./controllers/App'))
app.controller('LabsController', require('./controllers/Labs'))
app.controller('HomeController', require('./controllers/Home'))
app.controller('BrowseController', require('./controllers/Browse'))
app.controller('MarketController', require('./controllers/Market'))
app.controller('SettingsController', require('./controllers/Settings'))

app.directive('autoFocus', require('./directives/autofocus'))
app.directive('identicon', require('./directives/identicon'))

app.service('Alert', require('./services/Alert'))
app.service('Peers', require('./services/Peers'))
app.service('Socket', require('./services/Socket'))
app.service('Status', require('./services/Status'))

angular.bootstrap(document, ['obApp'])