'use strict';
var Fluxxor = require('fluxxor');
var app = require('ui/app');
var _ = require('lodash');
var debug = require('debug')('frontend:ui:MarketStore');

// Stores markets (peers).
var MarketStore = module.exports = Fluxxor.createStore({
  actions: {
  },

  initialize(data) {
    this.markets = data;
  },

  getMarkets() {
    return this.markets;
  }
});
