'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');
var Tab = require('./Tab');

// TabSet. Children should be <Tab> views.
var Settings = module.exports = React.createClass({
  displayName: 'Settings',
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    children: function(props, propName, componentName) {
      React.PropTypes.element.apply(this, arguments);
      for(var i = 0; i < props.children.length; i++) {
        if (!props.children[i] instanceof Tab) {
          throw new Error('<TabSet> children must be <Tab> elements!'); 
        }
      }
    },
    className: React.PropTypes.string
  },

  getInitialState() {
    return {tabSelected: 0};
  },

  getDefaultProps() {
    return {
      className: ''
    };
  },

  tabTitle(tabView, i) {
    return (
      <li role="presentation" className={this.state.tabSelected === i ? 'active' : ''}>
        <a href="#" onClick={this.onTabSelect.bind(this, i)}>{tabView.props.title}</a>
      </li>
    );
  },

  onTabSelect(i, e) {
    this.setState({tabSelected: i});
  },

  render() {
    var selectedTab = Array.isArray(this.props.children) ? 
      this.props.children[this.state.tabSelected] : 
      this.props.children;

    return (
      <div className={"tab-set " + this.props.className}>
        <ul className="tabs">
          {React.Children.map(this.props.children, this.tabTitle)}
        </ul>
        {selectedTab}
      </div>
    );
  }
});
