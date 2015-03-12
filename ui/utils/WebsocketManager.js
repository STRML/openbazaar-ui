'use strict';

var ws;

module.exports = {
  init(app) {
    var api = app.settings.api;
    var socket_uri = api.protocol + "//" + api.host + ":" + api.port + api.pathname;
    console.log('Started websocket:', socket_uri);
    ws = new WebSocket(socket_uri);

    ws.onmessage = this.onWSMessage.bind(this);
    ws.onerror = this.onWSError.bind(this);
    ws.onopen = this.onWSOpen.bind(this);
    ws.onclose = this.onWSClose.bind(this);
    return ws;
  },

  getWebSocketStream(name) {
    // TODO
    return ws;
  },

  onWSOpen(evt) {
    ws.send(JSON.stringify({"id":42, "command":"load_page", "params":{}}));
    ws.send(JSON.stringify({"id":42, "command":"check_order_count", "params":{}}));
  },

  onWSClose(evt) {
    console.log("closed", evt);
    console.log('The websocket closed unexpectedly. Refreshing.');
    window.location.reload();
  },

  onWSError(err) {
    console.log("WS Error:", err);
  },

  onWSMessage(evt) {
    var data;
    try {
      data = JSON.parse(evt.data);
    } catch(e) {
      return this.onWSError(e);
    }
    //console.log("Websocket.onMessage!");
    console.log('On Message [', data.result.type, ']: ',data);
  }
};
