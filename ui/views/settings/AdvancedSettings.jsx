'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');

// OB Advanced Settings page.
var AdvancedSettings = module.exports = React.createClass({
  displayName: 'AdvancedSettings',
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
  },

  render() {

    return (
      <div className="settings settings-advanced">
        <form className="form">
          <div className="row section-header">
            <div className="col-sm-6 section-title">
              <h2>Advanced</h2>
            </div>
            <div className="col-sm-6 section-controls-sm">
              <button className="btn btn-sm">Save Changes</button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-3">
                  <label>Obelisk Server</label>
                </div>
                <div className="col-sm-9">
                  <div className="btn-group">
                    <button ng-model="useTestnet" btn-radio="true" className="btn btn-default btn-sm">Yes</button>
                    <button ng-model="useTestnet" btn-radio="false" className="btn btn-default btn-sm">No</button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <label>Obelisk Server</label>
                </div>
                <div className="col-sm-4">
                  <input placeholder="tcp://85.25.198.97:8081" className="form-control"/>
                </div>
              </div>
            </div>
          </div>
          <div className="row section-header">
            <div className="col-sm-6 section-title">
              <h2>Demos</h2>
            </div>
            <div className="col-sm-6 section-title">
              <h2>Developer</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="btn-group-vertical btn-block">
                <button ng-click="dev.test.newMessage($event)" className="btn btn-default"><i className="mdi mdi-comment-text"></i> New Message</button>
                <button ng-click="dev.screenshot.capture($event)" disabled className="btn btn-default"><i className="mdi mdi-camera-iris"></i> Screenshot (Ctrl+S)</button>
                <button ng-click="dev.test.newNotification($event)" className="btn btn-default"><i className="mdi mdi-desktop-mac"></i> Desktop Notification</button>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="btn-group-vertical btn-block">
                <button ng-click="dev.openTools($event)" className="btn btn-default"><i className="mdi mdi-google-chrome"></i>Show DevTools</button>
                <button className="btn btn-default"><i className="mdi mdi-broom"></i> Clear Cache</button>
                <button className="btn btn-default"><i className="mdi mdi-broom"></i> Clear Peers</button>
                <button className="btn btn-default"><i className="mdi mdi-stop"></i> Stop Server</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
});
