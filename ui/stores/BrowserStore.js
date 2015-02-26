'use strict';
var Fluxxor = require('fluxxor');
var app = require('ui/app');
var _ = require('lodash');
var debug = require('debug')('frontend:ui:BrowserStore');

// Stores browser-specific properties, such as time zone, init time, and more.
var BrowserStore = module.exports = Fluxxor.createStore({
  actions: {
    'APP_DID_MOUNT': 'onAppMount',
    'FLUX_INIT': 'onFluxInit',
    'NAVIGATE': 'onNavigate',
    'SET_PAGE_TITLE': 'onSetPageTitle',
    'WEBSOCKET_CONNECTED': 'onWebsocketConnected',
    'WEBSOCKET_DISCONNECTED': 'onWebsocketDisconnected',
    'WEBSOCKET_RECONNECTING': 'onWebsocketReconnecting'
  },

  // Announce 'connection lost' when the websocket has failed to connect this many times in a row
  websocketDisconnectLimit: 3,

  initialize(data) {
    this.timezoneOffset = typeof data.timezoneOffset === "number" ? 
      data.timezoneOffset : new Date().getTimezoneOffset();
    this.origin = data.origin;
    this.title = {siteName: 'OpenBazaar', notifications: 0};

    // Fake connected at first. If we're unable to connect it will emit shortly.
    // This is so the prerendered page doesn't have a big overlay over it.
    this.connectionStatus = {
      websocket: true // connected: true
    };
    this.unloading = false;

    if (process.browser) {
      window.addEventListener('beforeunload', this.onBeforeUnload.bind(this));
    }
  },

  onFluxInit() {
    // Place actions here that need to be deferred until init is complete.
  },

  getConnectionStatus() {
    return this.connectionStatus;
  },

  getOrigin() {
    return this.origin;
  },

  getTimezoneOffset() {
    return this.timezoneOffset;
  },

  // Once the app has mounted, we update with the local tz.
  onAppMount() {
    var tz = new Date().getTimezoneOffset();
    // Only fire an update if there was an actual change
    if (tz !== this.timezoneOffset) {
      this.timezoneOffset = tz;
      this.emit('change');
    }
  },

  // When unloading occurs, mark it. We stop throwing connection status updates.
  onBeforeUnload() {
    this.unloading = true;
  },

  onNavigate(path) {
    app.router.navigate(path);
  },

  onSetPageTitle(title) {
    this.setTitle(title);
  },

  onWebsocketConnected() {
    // The connection was lost, now it's back. Reimage stores.
    var me = this;
    if (this.wasDisconnected) {
      setTimeout(function() {
        // TODO implement this
        me.flux.actions.imageAllStores();
        me.wasDisconnected = false;
      }, 0);
    }
    this.changeConnectionStatus({websocket: true});
  },

  onWebsocketDisconnected() {
    this.wasDisconnected = true;
    this.changeConnectionStatus({websocket: false});
  },

  onWebsocketReconnecting() {
    this.changeConnectionStatus({websocket: 'reconnecting'});
  },

  changeConnectionStatus(change) {
    // Prevents flash on unload when services disconnect.
    if (this.unloading) return;
    // Extend the object so an identity match will fail - ghetto immutable objects.
    // FIXME use immutable-js?
    this.connectionStatus = _.extend({}, this.connectionStatus, change);
    this.emit('change');
  },

  // Flashes a notification in the title.
  flashNotificationsInTitle() {
    if (!this.title.notifications) return;
    document.title = this.title.notifications + ' new notification' + _.pluralize(this.title.notifications) + '!';
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.setTitle.bind(this), 1500);
  },

  // Title is composed of a few settable parts.
  // siteName: String
  // pageName: String
  // notifications: Number
  setTitle(titleParts) {
    if (!process.browser) return;
    _.extend(this.title, titleParts);
    var title = 
      (this.title.pageName ? this.title.pageName + ' - ' : '') +
      this.title.siteName;
    document.title = title;
    if (this.title.notifications) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.flashNotificationsInTitle.bind(this), 1500);
    }
  }

});
