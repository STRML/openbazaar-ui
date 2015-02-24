'use strict';
var PNGLib = require('pnglib');
var Identicon = require('identicon');
var React = require('react');

var IdenticonView = module.exports = React.createClass({
  propTypes: {
    iconSize: React.PropTypes.string.isRequired,
    hash: React.PropTypes.string.isRequired
  },
  getDefaultProps() {
    return {
      className: ''
    };
  },
  render() {
    var dataHex = this.props.hash.substring(32, 64);
    console.log(dataHex);
    var data = new Identicon(dataHex, this.props.iconSize).toString();
    return <img className={"identicon " + this.props.className} src={"data:image/png;base64," + data} />;
  }
});
