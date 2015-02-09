module.exports = function() {
	return {
		restrict: 'E', // element
		scope: {
			hash: '=',
			iconSize: '='
		},
		link: function(scope, element, attrs) {
			var iconSize = scope.iconSize || 32;

			// Create the identicon
			function createFromHex(dataHex) {
					var data = new Identicon(dataHex, iconSize).toString();
					element.html('<img class="identicon" src="data:image/png;base64,' + data + '">');
				}
				// Watch for hash changes
			scope.$watch('hash', function() {
				if (scope.hash) {
					var tohash = scope.hash.substring(32, 64);
					createFromHex(tohash);
				}
			});
		}
	};
};