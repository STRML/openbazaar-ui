var angular = require('angular');

require('jquery');
require('ngRoute');
require('ngRouteSegment');
require('ngAnimate');
require('bootstrap');
require('bootstrap-tpls');
require('identicon');

var app = angular.module('obApp', [
	'ngRoute',
	'ngAnimate',
	'route-segment',
	'view-segment',
	'ui.bootstrap',
]);

app.config(function ($routeProvider, $routeSegmentProvider, $locationProvider) {

	// define routes and segments
	$routeSegmentProvider
		.when('/labs', 'labs')
		.when('/home', 'home')
		.when('/store', 'store')
		.when('/messages', 'messages')
		.when('/messages/:id', 'messages.message')
		.when('/settings', 'settings')
		.when('/markets', 'markets')
		.when('/markets/:id', 'markets.view');

	$routeSegmentProvider
		// labs segment
		.segment('labs', {
			default: true,
			templateUrl: 'templates/labs.html',
			controller: require('./controllers/labs')
		})

		// home segment
		.segment('home', {
			default: true,
			templateUrl: 'templates/home.html',
			controller: require('./controllers/home')
		})

		// my market segment
		.segment('store', {
			templateUrl: 'templates/store.html'
		})
			.within()
			.segment('overview', {
				default: true,
				templateUrl: 'templates/store/overview.html',
				controller: function () { console.log('store overview'); }
			})
			.segment('contracts', {
				templateUrl: 'templates/store/contracts.html',
				controller: function () { console.log('store contracts'); }
			})
			.up()


		// markets segment
		.segment('markets', {
			templateUrl: 'templates/markets.html',
		})
			.within()
			.segment('index', {
				default: true,
				templateUrl: 'templates/markets/index.html',
				controller: require('./controllers/markets')
			})
			.segment('view', {
				templateUrl: 'templates/markets/view.html',
				controller: require('./controllers/markets/view')
			})
			.up()

		// messages segment
		.segment('messages', {
			templateUrl: 'templates/messages.html'
		})
			.within()
			.segment('overview', {
				default: true,
				templateUrl: 'templates/messages/overview.html',
				controller: require('./controllers/messages')
			})
			.segment('message', {
				templateUrl: 'templates/messages/message.html',
				controller: require('./controllers/messages/view'),
				dependencies: ['id']
			})
			.up()

		// settings segment
		.segment('settings', {
			templateUrl: 'templates/settings.html',
			controller: require('./controllers/settings')
		});

	$routeProvider.otherwise('/home');
});

app.controller('AppController', require('./controllers/app'));

app.directive('autoFocus', require('./directives/autofocus'));
app.directive('identicon', require('./directives/identicon'));

app.service('Alert', require('./services/Alert'));
app.service('Peers', require('./services/Peers'));
app.service('Socket', require('./services/Socket'));
app.service('Status', require('./services/Status'));

angular.bootstrap(window.document, ['obApp']);
