'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');
var IdenticonView = require('ui/views/widgets/Identicon');
var FluxMixin = require('fluxxor').FluxMixin(React);

// OB Markets Page.
var Markets = module.exports = React.createClass({
  displayName: 'Markets',
  mixins: [React.addons.PureRenderMixin, FluxMixin],
  propTypes: {
    markets: React.PropTypes.array.isRequired
  },

  market(market, i) {
    return (
      <div className="col-sm-3 text-center market" onClick={this.onOpenMarket.bind(this, market.guid)} key={i}>
        <IdenticonView iconSize={150} hash={market.guid} className="identicon-center" />
        <div>{market.nick}</div>
      </div>
    );
  },

  onOpenMarket(guid, e) {
    this.getFlux().actions.navigate(app.root + "/market/" + guid);
  },

  render() {
    return (
      <div className="page markets">
        <div className="row section-header">
          <div className="col-sm-6 section-title">
            <h2>Browse Connected Markets</h2>
            <div className="text-muted">
              <small>Viewing <strong>{this.props.markets.length} </strong>of  <strong>{this.props.markets.length}</strong></small>
            </div>
          </div>
          <div className="col-sm-6 section-controls">
            <button className="btn btn-default btn-sm">Sort By</button>
          </div>
        </div>
        <div className="row">
          {_.map(this.props.markets, this.market)}
        </div>
      </div>
    );
  }
});
