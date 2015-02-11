module.exports = [
  '$scope',
  '$location',
  function ($scope, $location) {
    $scope.open = function (message) {
      $location.path('/messages/' + message.id);
    };
  }
];
