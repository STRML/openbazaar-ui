'use strict';
var BrowserStore = require('ui/stores/BrowserStore');
var MarketStore = require('ui/stores/MarketStore');

module.exports = function(data) {
  return {
    // stuffStore = new require('./stores/StuffStore')(data.stuff)
    BrowserStore: new BrowserStore(data.browser),
    MarketStore: new MarketStore(data.peers)
  };
};
