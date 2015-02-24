'use strict';
var Fluxxor = require('fluxxor');
var app = require('ui/app');
var _ = require('lodash');
var debug = require('debug')('frontend:ui:MessageStore');

// Stores messages.
var MessageStore = module.exports = Fluxxor.createStore({
  actions: {
  },

  initialize(data) {
    this.messages = data;
  },

  getMessages() {
    return this.messages;
  }
});
