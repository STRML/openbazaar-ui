'use strict';
var React = require('react/addons');
var app = require('ui/app');
var _  = require('lodash');

// OB Home Page.
var Home = module.exports = React.createClass({
  displayName: 'Home',
  mixins: [React.addons.PureRenderMixin],
  propTypes: {
  },

  render() {
    return (
      <div className="page home">
        <div className="row section-header">
          <div className="col-lg-12 section-title">
            <div className="jumbotron">
              <h1>Welcome</h1>
              <p>You are <strong>now ready</strong> to join the world on a mission of freedom. Freedom to purchase, sell, and trade.</p>
              <div className="coreContent">
                <p>Some of the cool features we are working on:</p>
                <ul>
                  <li>Secure peer to peer merchants</li>
                  <li>Anonymous ratings system</li>
                  <li>Ricardian Contracts for various types of deals</li>
                  <li>Third-party arbitration system</li>
                  <li>Encrypted messaging and chat</li>
                </ul>
              </div>
              <p>
                Want to help us change the world?
                <br />
                Visit us on <a href="https://github.com/OpenBazaar/OpenBazaar" target="_blank">GitHub</a>.
              </p>
              <small>
                This UI is a work in progress. Please see the sidebar links to browse the available markets and
                list products.
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
