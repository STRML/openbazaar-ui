'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');

// OB Home Page.
var Home = module.exports = React.createClass({
  displayName: 'Home',
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
  },

  render() {
    return (
      <div className="page home">
        OB Home
      </div>
    );
  }
});
