'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');
var TabSet = require('ui/views/widgets/TabSet');
var Tab = require('ui/views/widgets/Tab');

var AdvancedSettings = require('ui/views/settings/AdvancedSettings');
var BackupSettings = require('ui/views/settings/BackupSettings');
var KeySettings = require('ui/views/settings/KeySettings');
var ProfileSettings = require('ui/views/settings/ProfileSettings');
var TrustSettings = require('ui/views/settings/TrustSettings');

// OB Settings Page.
var Settings = module.exports = React.createClass({
  displayName: 'Settings',
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
  },

  render() {
    return (
      <TabSet className="page settings">
        <Tab title="Profile"><ProfileSettings /></Tab>
        <Tab title="Trusts"><TrustSettings /></Tab>
        <Tab title="Keys"><KeySettings /></Tab>
        <Tab title="Backup"><BackupSettings /></Tab>
        <Tab title="Advanced"><AdvancedSettings /></Tab>
      </TabSet>
    );
  }
});
