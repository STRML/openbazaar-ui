'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');

// OB Market Page.
var Market = module.exports = React.createClass({
  displayName: 'Market',
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
    guid: React.PropTypes.string.isRequired,
    markets: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      market: _.find(this.props.markets, {guid: this.props.guid})
    };
  },

  contract(contract) {
    return (
      <tr>
        <td className="title">{contract.item_title}</td>
        <td>
          <div className="short">{contract.item_desc}</div>
        </td>
        <td className="price"> <i className="mdi mdi-currency-btc"></i>{contract.item_price}</td>
      </tr>
    );
  },

  render() {
    var market = this.state.market;

    if (!market || !market.nickname) {
      return <div>Market not found.</div>;
    }

    return (
      <div className="my-market fadeOut">
        <div className="backdrop market">
        </div>
        <div className="row section-header pinned">
          <div className="col-sm-6 section-title">
            <h2>Connected Market</h2>
          </div>
          <div className="col-sm-6 section-controls">
            <button className="btn btn-sm">Trust Notary</button> 
            <button className="btn btn-sm text-success"><strong>Trusted Arbiter</strong></button> 
            <button className="btn btn-primary btn-sm">Send Message</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h1 className="market-name">{market.nickname}</h1>
          </div>
          <div className="col-sm-12">
            <div className="block-shade"><small><strong>GUID: </strong>{ market.guid.toUpperCase() }</small>
              <p>{market.text}</p>
              <hr/>
              <table className="table product-table">
                <thead>
                  <tr>
                    <th>Contract Title</th>
                    <th>Description</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {_.map(market.contracts, this.contract)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row section-header">
          <div className="col-sm-6 section-title">
            <h2>Details</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="block-shade">
              <div className="form">
                {market.email ? 
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-3">
                        <label>Email Address</label>
                      </div>
                      <div className="col-sm-5">
                        <div className="form-control-static">{market.email}</div>
                      </div>
                    </div>
                  </div>
                : ''}
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-3">
                      <label>OpenBazaar Public Key</label>
                    </div>
                    <div className="col-sm-9">
                      <div className="form-control-static">
                        <pre>{market.pubkey}</pre>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-3">
                      <label>Reputation Pledge</label>
                    </div>
                    <div className="col-sm-5">
                      <div className="form-control-static">0</div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-3">
                      <label>PGP Key</label>
                    </div>
                    <div className="col-sm-8">
                      <div className="form-control-static">
                        <pre>{market.PGPPubKey}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
