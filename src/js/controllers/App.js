var _ = require('lodash');

module.exports = [
	'$scope',
	'$location',
	'$http',
	'$timeout',
	'Socket',
	'Peers',
	'Status',
	function ($scope, $location, $http, $timeout, Socket, Peers, Status) {
		gui.Window.get().show();
		$('body').addClass('loaded');
		$scope.status = Status.get();

		$scope.minimize = function () {
			gui.Window.get().minimize();
		};
		$scope.maximize = function () {
			gui.Window.get().maximize();
		};
		$scope.close = function () {
			gui.Window.get().close();
		};

		$scope.page = {
			title: 'OpenBazaar'
		};

		$scope.prevent = function (e) {
			return e.preventDefault();
		}

		Socket.$on('myself', function (e, msg) {
			$scope.guid = msg.guid;
			msg.peers.forEach(function (peer) {
				console.log(peer);
				Peers.add(peer);
			});
		})


		$scope.alerts = [];
		$scope.peers = Peers.get();

		$scope.currentRoute = function (path) {
			return $location.path() === path;
		};

		var messages = [];
		$scope.newMessages = function () {
			return (messages.length > 0);
		};

		var dev = {};
		dev.openTools = function (event) {
			event.preventDefault();
			win.showDevTools();
		}

		dev.test = {}

		dev.test.newMessage = function () {
			messages.push('test')
		}

		dev.test.newNotification = function () {
			new Notification("OpenBazaar", {
				body: 'Here\'s your typical desktop notification.'
			})
		}


		var screenshot = dev.screenshot = {};
		screenshot.mode = false;

		$(document).on('keypress', function(event) {
			if (event.keyCode === 19 && event.ctrlKey === true) {
				screenshot.capture(event);
			}
		})

		screenshot.capture = function (event) {
			// disabled until fixed
			return;
			if (event) {
				event.preventDefault();
			}

			screenshot.mode = true;
			var clipboard = gui.Clipboard.get();

			$timeout(function () {
				win.capturePage(function (img) {
						console.log(img);
						screenshot.mode = false;
						$scope.$apply();

						Status.start('Taking screenshot...');

						$http({
							method: 'post',
							url: 'https://api.imgur.com/3/image',
							headers: {
								Authorization: 'Client-ID 820768d66c834a4',
								'Content-Type': 'application/json'
							},
							data: {
								image: img.split(',')[1]
							}
						})
						.success(function (res) {
							Status.endAll();

							new Notification("Screenshot taken!", {
								body: 'Copied screenshot URL to clipboard.'
							})

							clipboard.set(res.data.link);
							dev.screenshot.url = res.data.link;
							// Alert.create({
							// 	context: 'alert-success',
							// 	icon: 'mdi-camera',
							// 	value: 'Copied screenshot URL to clipboard.'
							// });
						})
						.error(function () {
							console.log('Error', arguments)
						})
				}, {
					format: 'png'
				});
			}, 250);
		};

		$scope.dev = dev;
	}
]