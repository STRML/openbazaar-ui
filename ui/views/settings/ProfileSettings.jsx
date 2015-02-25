'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');

// OB Profile Settings page.
var ProfileSettings = module.exports = React.createClass({
  displayName: 'ProfileSettings',
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
  },

  render() {

    return (
      <div className="settings settings-profile">
        <form className="form">
          <div className="row section-header">
            <div className="col-sm-6 section-title">
              <h2>Your Details</h2>
            </div>
            <div className="col-sm-6 section-controls">
              <button className="btn btn-sm">Save Changes</button>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Name</label>
              </div>
              <div className="col-sm-3">
                <input className="form-control"/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Email Address</label>
              </div>
              <div className="col-sm-4">
                <input className="form-control"/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Bitmessage Address</label>
              </div>
              <div className="col-sm-9">
                <input className="form-control"/>
                <div className="help-block">OpenBazaar uses <a href="href">Bitmessage</a> as our private messaging technology. This is your inbox where all messages from other network members will reside.</div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Namecoin ID</label>
              </div>
              <div className="col-sm-9">
                <input className="form-control"/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Store Description</label>
              </div>
              <div className="col-sm-9">
                <textarea className="form-control"></textarea>
              </div>
            </div>
          </div>
          <hr/>
          <div className="row section-header">
            <div className="col-sm-10 section-title">
              <h2>Shipping Information</h2>
            </div>
            <div className="col-sm-2 section-controls">
              <button className="btn btn-sm">Save Changes</button>
            </div>
            <div className="col-sm-12"><small className="text-info">This information will be encrypted and only be sent to your seller when you have marked your order for payment.</small></div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Recipient Name</label>
              </div>
              <div className="col-sm-6">
                <input className="form-control"/>
                <div className="help-block">Name visible on the package.</div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Street Address</label>
              </div>
              <div className="col-sm-9">
                <input className="form-control"/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Street Address (cont.)</label>
              </div>
              <div className="col-sm-9">
                <input className="form-control"/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>City</label>
              </div>
              <div className="col-sm-3">
                <input className="form-control"/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>State / Province / Region</label>
              </div>
              <div className="col-sm-3">
                <input className="form-control"/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Zip Code</label>
              </div>
              <div className="col-sm-2">
                <input className="form-control"/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Country</label>
              </div>
              <div className="col-sm-4">
                <input className="form-control"/>
              </div>
            </div>
          </div>
          <hr/>
          <div className="row section-header">
            <div className="col-sm-10 section-title">
              <h2>Reputation Pledge</h2>
            </div>
            <div className="col-sm-2 section-controls">
              <button className="btn btn-sm">Save Changes</button>
            </div>
            <div className="col-sm-12"><small className="text-info">Buyers trust stores with reputation pledges more than stores without.</small></div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Your Pledge</label>
              </div>
              <div className="col-sm-2">
                <div className="input-group">
                  <div className="input-group-addon"><i className="mdi mdi-currency-btc"></i></div>
                  <input value="0" className="form-control"/>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Proof-of-burn address</label>
              </div>
              <div className="col-sm-9">
                <input className="form-control"/>
              </div>
            </div>
          </div>
          <hr/>
          <div className="row section-header">
            <div className="col-sm-10 section-title">
              <h2>Act as an Arbiter</h2><small className="text-info">Offering arbitration services is an important service to the OpenBazaar community. It ensures that disputes get resolved in a responsible and informed way. If you want to act as an arbiter fill out the form below and you will be available to the community at large to serve in that capacity.</small>
            </div>
            <div className="col-sm-2 section-controls">
              <button className="btn btn-sm">Save Changes</button>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Make me an arbiter</label>
              </div>
              <div className="col-sm-9">
                <div className="btn-group btn-group-sm">
                  <button ng-model="actAsArbiter" btn-radio="true" className="btn btn-default">Yes</button>
                  <button ng-model="actAaArbiter" btn-radio="false" className="btn btn-default">No</button>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Expriences &amp; Services</label>
              </div>
              <div className="col-sm-9">
                <textarea className="form-control"></textarea>
              </div>
            </div>
          </div>
          <hr/>
          <div className="row section-header">
            <div className="col-sm-10 section-title">
              <h2>Act as a Notary</h2>
            </div>
            <div className="col-sm-2 section-controls">
              <button className="btn btn-sm">Save Changes</button>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-3">
                <label>Make me a notary</label>
              </div>
              <div className="col-sm-9">
                <div className="btn-group btn-group-sm">
                  <button ng-model="actAsNotary" btn-radio="true" className="btn btn-default">Yes</button>
                  <button ng-model="actAsNotary" btn-radio="false" className="btn btn-default">No</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
});
