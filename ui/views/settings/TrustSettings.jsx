'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');

// OB Trust Settings page.
var TrustSettings = module.exports = React.createClass({
  displayName: 'TrustSettings',
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
  },

  render() {

    return (
      <div className="settings settings-trust">
        <div className="row section-header">
          <div className="col-sm-6 section-title">
            <h2>Trusted Arbiters</h2><small className="text-info">The addresses below are your trusted arbiters for transactions. You will be able to choose one at time of purchase.</small>
          </div>
          <div className="col-sm-6 section-controls-sm">
            <div className="input-group input-group-sm">
              <input placeholder="Enter an arbiter's OpenBazaar GUID" className="form-control"/>
              <div className="input-group-btn">
                <button className="btn btn-primary">Trust Arbiter</button>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>GUID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>seeds.openlabs.co</strong></td>
              <td>38f2294d84c192e606b234739b5004297ccebf76</td>
              <td className="text-right"><i className="mdi mdi-delete"></i></td>
            </tr>
          </tbody>
        </table>
        <hr/>
        <div className="row section-header">
          <div className="col-sm-6 section-title">
            <h2>Trusted Notaries</h2><small className="text-info">The addresses below are notaries used during transactions.</small>
          </div>
          <div className="col-sm-6 section-controls-sm">
            <div className="input-group input-group-sm">
              <input placeholder="Enter a notary's OpenBazaar GUID" className="form-control"/>
              <div className="input-group-btn">
                <button className="btn btn-primary">Trust Notary</button>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>GUID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Bizarre Co. Seed [US] </strong></td>
              <td>5f19dd32ee5b6caeb657da6db9bd0ea40ff95d96</td>
              <td className="text-right"><i className="mdi mdi-delete"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});
