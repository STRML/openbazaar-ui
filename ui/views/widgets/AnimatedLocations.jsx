'use strict';
var React = require('react');
var Router = require('react-router-component');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var FluxMixin = require('fluxxor').FluxMixin(React);
var app = require('ui/app');

var AnimatedLocations = React.createClass({
 
  mixins: [
    Router.AsyncRouteRenderingMixin,
    Router.RouterMixin,
    React.addons.PureRenderMixin,
    FluxMixin
  ],
  getRoutes(props) {
    return props.children;
  },

  setTitle() {
    var match = this.getMatch(), pageName;
    var path = match.route && match.route.props.path;
    if (path) {
      if (typeof path !== "string") {
        path = match.matchedPath;
      }
      var msg = app.messages.titles[path.replace(app.root, '')];
      pageName = typeof msg === "function" ? msg(match.match) : msg;
    } else {
      // Route not matched
      pageName = '404';
    }
    this.getFlux().actions.setPageTitle({pageName: pageName});
    return pageName;
  },

  render() {
    var title = this.setTitle();
    var handler = this.renderRouteHandler({key: this.state.match.path});
    return <TransitionGroup {...this.props} component="div" data-page-title={title}>{handler}</TransitionGroup>;
  }
});

module.exports = AnimatedLocations;
