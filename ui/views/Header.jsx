'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');
var threeDots = require('ui/assets/images/three-dots.svg');

// OB Header.
var Header = module.exports = React.createClass({
  displayName: 'Header',
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    status: React.PropTypes.object.isRequired
  },

  getDefaultProps() {
    // TODO removeme
    return {
      status: {
        running: true,
        text: 'Status Text'
      }
    };
  },

  onClose(e) {

  },

  onMinimize(e) {

  },

  onMaximize(e) {

  },

  render() {
    return (
      <div className="topbar">
        <div className="logo"><strong>Open</strong>Bazaar</div>
        {this.props.status.running ? 
          <div className="status fadeOut">
            <span>{this.props.status.text}</span>
            <img src={threeDots}/>
          </div>
        : ''}
        <div className="shade" />
        <div className="controls">
          <i onClick={this.onMinimize} className="mdi mdi-minus-box"></i>
          <i onClick={this.onMaximize} className="mdi mdi-plus-box"></i>
          <i onClick={this.onClose} className="mdi mdi-close-box"></i></div>
      </div>
    );
  }
});
