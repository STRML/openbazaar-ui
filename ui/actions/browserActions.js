'use strict';
var debug = require('debug')('ob:browserActions');

var actions = module.exports = {
  appDidMount() {
    if (debug.enabled) {
      // Override dispatch to call debug.
      var dispatch = this.dispatch;
      this.dispatch = function(action) {
        debug('dispatched', action);
        dispatch.apply(this, arguments);
      };
    }
    this.dispatch('APP_DID_MOUNT', {});
  },
  // Only thrown in browser.
  fluxInit() {
    if (process.browser) {
      this.dispatch('FLUX_INIT', {});
    }
  },
  navigate(path) {
    this.dispatch('NAVIGATE', path);
  },
  setPageTitle(title) {
    this.dispatch('SET_PAGE_TITLE', title);
  },
  websocketConnected() {
    this.dispatch('WEBSOCKET_CONNECTED');
  },
  websocketDisconnected() {
    this.dispatch('WEBSOCKET_DISCONNECTED');
  },
  websocketReconnecting() {
    this.dispatch('WEBSOCKET_RECONNECTING');
  }
};
