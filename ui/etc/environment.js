'use strict';
var _ = require('lodash');

// Call this to get your config
module.exports.generateConfig = function generateConfig(env) {
  var settings = _.merge({}, module.exports.common, module.exports[env]);
  return settings;
};

module.exports.common = {
  root: '/app/',
  api: {
    host: 'localhost',
    port: 1234 // input on load? TODO find a way to figure this out
  },
  websocket: {
    heartbeatExpectationInterval: 10000
  }
};

// Load environments. No looping because browserify.
module.exports.local = require('./environment-local');
module.exports.development = require('./environment-development');
module.exports.test = require('./environment-test');
module.exports.stage = require('./environment-stage');
module.exports.production = require('./environment-production');

