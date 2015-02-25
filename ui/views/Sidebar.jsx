'use strict';
var React = require('react/addons');
var cx = React.addons.classSet;
var app = require('ui/app');
var _  = require('lodash');

// OB navigation Sidebar.
var Sidebar = module.exports = React.createClass({
  displayName: 'Sidebar',
  mixins: [React.addons.PureRenderMixin, React.addons.LinkedStateMixin],
  propTypes: {
    currentPath: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      searchQuery: ''
    };
  },

  doSearch(e) {
    console.log('TODO Search. Query:', this.state.searchQuery);
  },

  link(href, title, icon) {
    var className = cx({
      active: this.props.currentPath === href
    });
    className += ' ' + title.toLowerCase();
    return (
      <li className={className}>
        <a href={href}>
          <i className={"mdi mdi-" + icon}></i>
        </a>
      </li>
    );
  },

  render() {

    return (
      <div className="sidebar">
        <ul className="sidebar-nav">
          <li>
            <form className="search" onSubmit={this.doSearch}>
              <label htmlFor="search"><i className="mdi mdi-magnify"></i></label>
              <input id="search" placeholder="Search markets and products" valueLink={this.linkState('searchQuery')} />
            </form>
          </li>
          {this.link('/home', 'home', 'home')}
          {this.link('/markets', 'markets', 'store')}
          {this.link('/messages', 'messages', 'comment-text')}
          {this.link('/settings', 'settings', 'settings')}
          {this.link('/labs', 'labs', 'beaker')}
        </ul>
      </div>
    );
  }
});
