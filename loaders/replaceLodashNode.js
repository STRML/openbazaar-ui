'use strict';

// From @sokra at https://github.com/webpack/webpack/issues/544
module.exports = function(source) {
  this.cacheable && this.cacheable();
  return source;
};
var moduleName = /[\\\/]([^\\\/]+)\.js$/;
module.exports.pitch = function(request) {
  this.cacheable && this.cacheable();
  var match = request.match(moduleName);
  if(match) {
    return "module.exports = require('lodash')[" + JSON.stringify(match[1]) + "];";
  }
};
