'use strict';
var app = require('ui/app');
// Allows calling .promise() instead of .end(cb)
require('superagent-bluebird-promise');
var superagentDefaults = require('superagent-defaults');
var superagent = require('superagent');
var _ = require('lodash');
var debug = require('debug')('ob:APIRequest');


var apiURL = require('url').format(app.settings.api);
module.exports = superagentDefaults();

// Set defaults that should be applied to all requests, here.
module.exports
  // Prefix urls with the API path.
  .on('request', function(req) {
    if (req.url[0] === '/') {
      req.url = apiURL + req.url;
    }
    debug('Making request to', req.url);
    return req;
  });
