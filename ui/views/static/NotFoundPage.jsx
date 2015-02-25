'use strict';
var React = require('react');
var app = require('ui/app');

var NotFoundPage = module.exports = React.createClass({
  displayName: 'NotFoundPage',

  goBack: function(e) {
    e.preventDefault();
    window.history.back();
  },

  render() {
    return (
      <section className="widget widget-404 widget-narrow center-block v-offset-6">
        <div className="body">
          <div className="row">
            <div className="col-md-5">
              <h1 className="text-align-center">404</h1>
            </div>
            <div className="col-md-7">
              <div className="description">
                <h3>Sorry, we could not find that page. Please check the URL.</h3>
                <a href="#" onClick={this.goBack}>Go Back</a><br />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
});
