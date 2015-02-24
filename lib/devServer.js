'use strict';
// This is a little middleware so that we can preserve pushState
var superstatic = require('superstatic');
var express = require('express');
var path = require('path');
var fs = require('fs');

var port = process.env.PORT || 8001;
var webpackPort = process.env.WEBPACK_PORT || 8002;
var obPort = process.env.OB_PORT || 8003;

var app = express();

var index = fs.readFileSync(path.resolve(__dirname, '..', 'index.html')).toString();
index = index.replace(/%STATIC_PORT%/g, port).replace(/%WEBPACK_PORT%/g, webpackPort).replace(/%OB_PORT%/g, obPort);

app.use('(/)?(index.html)?', function(req, res) {
  res.end(index);
});

app.use(superstatic({
  cwd: path.resolve(__dirname, '..'),
  debug: true,
  gzip: true,
  // redirects: {
  //   "/": "/app"
  // },
  // routes: {
  //   "app/**":"index.html",
  // }
}));

app.listen(port, function() {
  console.log("OB UI Dev server running on port", port, "connecting to OpenBazaar at port", obPort);
});

