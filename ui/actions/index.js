'use strict';
var _ = require('lodash');

// Gather all actions. Update this when you add new files.
var actions = [
  require('./browserActions')
];

// Check for action uniqueness
var duplicateKeys = _.intersection.apply(null, [[]].concat(_.map(actions, _.keys)));
if (duplicateKeys.length) {
  throw new Error('Duplicate action key(s) found: ' + duplicateKeys);
}

// Export all actions.
module.exports = _.extend.apply(null, [{}].concat(actions));
