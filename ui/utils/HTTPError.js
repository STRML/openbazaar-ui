'use strict';
var inherits = require('inherits');

function HTTPError(message, status) {
  Error.call(this);
  if(Error.captureStackTrace) 
    Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object
  this.name = "HTTPError";
  // Allow transposing arguments
  if (typeof message === "number" && typeof status === "string") {
    var a = message;
    message = status, status = a;
  }
  // Allow e.g. `new HTTPError(404)`
  if (!status && typeof message === "number") {
    status = message;
    message = '';
  }
  this.message = (message || "");
  this.status = status;
  this.code = status;
}

inherits(HTTPError, Error);

HTTPError.prototype.toString = function() {
  var str = this.name + ": ";
  if (this.status) str += "(" + this.status + ") ";
  return str + (this.message || '');
};

module.exports = HTTPError;
