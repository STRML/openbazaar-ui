module.exports = [
  '$rootScope',
  '$timeout',
  function ($rootScope, $timeout) {
    var Connection = function(onMessage) {

      // var socket_uri = document.URL.replace(/https?:(.*)\/html\/.*/, 'ws:$1/ws');
      var socket_uri = 'ws://127.0.0.1:%WS_PORT%/ws';
      console.log('Started websocket:', socket_uri);
      var websocket = new WebSocket(socket_uri);

      websocket.onopen = function(evt) {
        self.websocket.send(JSON.stringify({'id':42, 'command':'load_page', 'params':{}}));
        self.websocket.send(JSON.stringify({'id':42, 'command':'check_order_count', 'params':{}}));
        //self.websocket.send(JSON.stringify({'id':42, 'command':'read_log', 'params':{}}));
      };

      websocket.onclose = function(evt) {
        console.log('closed', evt);
        console.log('The websocket closed unexpectedly. Refreshing.');
        // window.location.reload();
      };

      websocket.onerror = function(evt) {
        console.log('error', evt);
      };

      websocket.onmessage = function(evt) {
        var data = JSON.parse(evt.data);
        //console.log('Websocket.onMessage!');
        console.log('On Message [', data.result.type, ']: ',data);
        $timeout(function(){
          $rootScope.$apply(function(){
            onMessage(data.result);
          });
        });

      };

      this.websocket = websocket;
      var self = this;

      this.send = function(command, msg) {
        if (msg === undefined) {
          msg = {};
        }

        var request = {
          'id': 42,
          'command': command,
          'params': msg
        };

        var message = JSON.stringify(request);
        //console.log('Connection.send ->')

        if(self.websocket.readyState == 1){
          self.websocket.send(message);
        }
        else {
          self.websocket.onopen = function(e){
            self.websocket.send(message);
          };
        }
      };
    };

    var scope = $rootScope.$new(true);

    var socket = new Connection(function(data){
      scope.$emit('message', data);

      if (typeof data == 'object' && typeof data.type == 'string') {
        scope.$emit(data.type, data);
      }
    });

    scope.send = socket.send;
    scope.websocket = socket.websocket;

    return scope;
  }
];
