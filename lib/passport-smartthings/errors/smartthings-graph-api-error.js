
function SmartThingsGraphAPIError(message, type) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'SmartThingsGraphAPIError';
  this.message = message;
  this.type = type;
  this.status = 500;
}

/**
 * Inherit from `Error`.
 */
SmartThingsGraphAPIError.prototype.__proto__ = Error.prototype;

/**
 * Expose `SmartThingsGraphAPIError`.
 */
module.exports = SmartThingsGraphAPIError;
