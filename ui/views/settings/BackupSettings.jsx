'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');

// OB Backup Settings page.
var BackupSettings = module.exports = React.createClass({
  displayName: 'BackupSettings',
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
  },

  render() {

    return (
      <div className="settings settings-backup">
        <div className="row section-header">
          <div className="col-sm-6 section-title">
            <h2>Backup</h2>
          </div>
          <div className="col-sm-6 section-controls">
            <button className="btn btn-primary btn-sm">Create a New Backup</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Filename</th>
                  <th className="text-right">Size</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>openbazaar-2015-Feb-07-06-03-12.tar.gz</td>
                  <td className="text-right">45mb</td>
                  <td className="text-right"><i className="mdi mdi-delete"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});
