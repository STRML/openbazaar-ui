'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');

// Displayed before initial data has loaded from OB.
var Loading = module.exports = React.createClass({
  displayName: 'Loading',
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    status: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <div className="loading-overlay">
        Loading...
      </div>
    );
  }
});
