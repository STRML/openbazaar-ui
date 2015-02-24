'use strict';
var _ = require('lodash');
var React = require('react');
var Fluxxor = require('fluxxor');
var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('ob:appInit');
var WebsocketManager = require('./utils/WebsocketManager');

// App bootstrap instance. Loaded in all modes.
var app = {
  // An application-wide emitter can be useful for certain things.
  emitter: new EventEmitter(),

  /**
   * Initialize the app.
   * @param  {Object} data     Bootstrapped data, if any.
   * @param  {Object} settings Environment settings.
   * @return {Application}     Application singleton.
   */
  init(data, settings){
    var app = this;
    // Bind environment settings to this object so they're easy to grab.
    this.settings = settings;

    // We want more than just 10.
    this.emitter.setMaxListeners(100);

    // Init app.
    getInitialData(app, data);
    if (process.browser) {
      initBrowser(app);
    }
    app.flux = initFlux(app, data);
    initViews(app, app.flux);

    // Export in dev
    if (process.browser && (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development')){
      window.app = app;
      window.debug = require('debug');
      // export so chrome devtools can find it
      window.React = require('react');
      window.ReactPerf = require('react/lib/ReactDefaultPerf');
    }
    return app;
  },
  // Debugging only, good for figuring out checksum failures
  renderToString: function() {
    var app = this;
    initViews(app, app.flux);
    return React.renderComponentToString(app.views.main);
  }
};

// Export
module.exports = app;

// Application data is passed in via data.js. 
// We now pass that in to ensure that React comes up with the
// same result when it renders the component (you'll see a warning in the browser console
// if it fails to render the same result - in which case there may be something out of whack
// with the data you're initialising with in the browser vs the server)
//
// If data is already provided, it is likely we are running on the server.
function getInitialData(app, data){
  data = data || {};
  app.initialData = data;
  app.csrfToken = data.csrfToken;
  app.root = "";
  app.revision = data.revision; // from .gitrevision
  app.messages = require('./utils/Messages')('EN-US');
}

/**
 * Init steps to only run in the browser.
 * @param  {Application} app App object.
 */
function initBrowser(app) {
  WebsocketManager.init(app);
  app.getWebSocketStream = WebsocketManager.getWebSocketStream.bind(WebsocketManager);
}

function initFlux(app, data){
  // Create all stores and pass them data.
  app.stores = require('./stores/index')(data);

  // Create actions
  var actions = require('./actions/index');
  app.flux = new Fluxxor.Flux(app.stores, actions);
  
  // Tell the stores that flux is up and running. Only executes in browser env.
  app.flux.actions.fluxInit();

  return app.flux;
}

function initViews(app, flux){
  var AppMain = require('ui/views/AppMain.jsx');

  app.views = {
    main: React.createElement(AppMain, {
      flux: flux
    })
  };
}
