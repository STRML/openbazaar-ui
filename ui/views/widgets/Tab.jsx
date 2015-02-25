'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');

// Tab. Belongs inside a <TabSet>.
var Tab = module.exports = React.createClass({
  displayName: 'Tab',
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    // Title is not actually used here, but by the outer <TabSet>
    title: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <div className="tab-content">
        {React.Children.only(this.props.children)}        
      </div>
    );
  }
});
