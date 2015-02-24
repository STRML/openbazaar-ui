'use strict';
var PNGLib = require('pnglib');
var Identicon = require('identicon');
var React = require('react');

var IdenticonView = React.createClass({
  propTypes: {
    iconSize: React.PropTypes.number.isRequired,
    hash: React.PropTypes.string.isRequired
  },
  getDefaultProps() {
    return {
      className: ''
    };
  },
  render() {
    var dataHex = this.props.hash.substring(32, 64);
    var data = new Identicon(dataHex, this.props.iconSize).toString();
    return <img className={"identicon " + this.props.className} src={"data:image/png;base64," + data} />;
  }
});

module.exports = IdenticonView;
