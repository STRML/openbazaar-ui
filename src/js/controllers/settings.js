var path = require('path');
var Tail = require('tail').Tail;

module.exports = [
  '$scope',
  function ($scope) {

    // var tail = new Tail(path.resolve(process.cwd(), '../OpenBazaar/logs/production.log'));
    // tail.on('line', function (line) {
    //   // console.log(arguments)
    //   $scope.log.lines.push(line);
    //   $scope.$apply();
    // });

    $scope.log = {};
    $scope.log.lines = [];

    $scope.tab = {
      selected: 0,
      select: function(event, tab) {
        event.preventDefault();
        this.selected = tab;
      }
    };
  }
];
