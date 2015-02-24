'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');
var FluxMixin = require('fluxxor').FluxMixin(React);
var Message = require('./Message.jsx');

// OB Messages Page.
var Messages = module.exports = React.createClass({
  displayName: 'Messages',
  mixins: [React.addons.PureRenderMixin, FluxMixin],
  propTypes: {
    messages: React.PropTypes.array.isRequired
  },

  message(message, i) {
    var className = message.read ? '' : 'unread';
    return (
      <tr className={className} onClick={this.openMessage.bind(this, message)} key={i}>
        <td className="from">{message.from}</td>
        <td className="subject">
          <span>{message.subject}</span> - <span className="preview">{message.summary}</span>
        </td>
        <td className="date">{message.date}</td>
      </tr>
    );
  },

  openMessage(message, e) {
    this.getFlux().actions.navigate(app.root + "/message/" + message.id);
  },

  render() {
    return (
      <div className="page messages">
        <div className="row section-header">
          <div className="col-sm-6 section-title">
            <h2>Messages</h2>
          </div>
          <div className="col-sm-6 section-controls">
            <button className="btn btn-primary btn-sm">Compose</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="table table-hover messages">
              <tbody>
                {_.map(this.props.messages, this.message)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});
