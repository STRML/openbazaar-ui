module.exports = [
  '$scope',
  '$location',
  'Messages',
  function ($scope, $location, Messages) {
    $scope.messages = Messages.get();

    if ($scope.messages.length === 0) {
      Messages.incoming({
        id: 1,
        from: 'OpenBazaar',
        subject: 'OpenBazaar 0.5 Release',
        body: 'Welcome You are now ready to join...',
        date: '12:30 am',
        read: false
      });
      Messages.incoming({
        id: 2,
        from: 'Random Shop',
        subject: 'Quasi nostrum illo',
        body: 'dignissimos facere optio ut blanditiis...',
        date: 'Jan 20',
        read: true
      });
      Messages.incoming({
        id: 3,
        from: 'OpenBazaar',
        subject: 'Welcome to OpenBazaar',
        body: 'Here\'s how you get started with...',
        date: '12/30/14',
        read: true
      });
    }

    $scope.open = function (message) {
      $location.path('/messages/' + message.id);
    };
  }
];
