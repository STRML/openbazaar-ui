// Initializes application in browser. This is a separate file in case we ever decide
// to do server rendering.
var React = require('react');

var settings = require('ui/etc/environment').generateConfig(process.env.NODE_ENV);

var initialData;

try {
  // Try to initial data from prerender and kill the node as soon as we get it.
  var dataEl = document.getElementById('initialData');
  initialData = JSON.parse(dataEl.getAttribute('data-data'));
  dataEl.parentNode.removeChild(dataEl);
} catch(e) {
  initialData = require('ui/test/fakeData');
}

var contentDiv = document.getElementById('content');



var app = require('./app').init(initialData, settings);
// Reassign to the return value of renderComponent, which gives us the actual mounted component
app.views.main = React.render(app.views.main, contentDiv);
