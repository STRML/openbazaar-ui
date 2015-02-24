'use strict';

var React = require("react");

// Called by the server to prerender app.
module.exports = function(data, env) {
  var settings = require('ui/etc/environment').generateConfig(env);
  var app = require('ui/app').init(data, settings);
  return React.renderToString(app.views.main);
};
