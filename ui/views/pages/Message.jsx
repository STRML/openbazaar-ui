'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');
var FluxMixin = require('fluxxor').FluxMixin(React);

// OB Message Page.
var Message = module.exports = React.createClass({
  displayName: 'Message',
  mixins: [React.addons.PureRenderMixin, FluxMixin],
  propTypes: {
    messages: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      message: _.find(this.props.messages, {id: this.props.id})
    };
  },

  render() {
    var message = this.state.message;

    return (
      <div className="page message">
        <div className="row section-header">
          <div className="col-sm-6 section-title">
            <h2>Message</h2>
          </div>
          <div className="col-sm-6 section-controls">
            <button className="btn btn-primary btn-sm">Reply</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <form className="form">
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-2">
                    <label>From: </label>
                  </div>
                  <div className="col-sm-10">
                    <div className="form-control-static">{message.from}</div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2">
                    <label>Subject: </label>
                  </div>
                  <div className="col-sm-10">
                    <div className="form-control-static">{message.subject}</div>
                  </div>
                </div>
              </div>
            </form>
            {/* FIXME we should sanitize this somehow */}
            <div className="block-shade" dangerouslySetInnerHTML={{__html: message.body}} />
          </div>
        </div>
      </div>
    );
  }
});
