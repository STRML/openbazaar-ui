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
        <div className="row section-header">
          <div className="col-sm-6 section-title">
            <h2>Welcome to OpenBazaar.</h2>
            <div>Please click the links on the sidebar.</div>
          </div>
        </div>
      </div>
    );
  }
});
