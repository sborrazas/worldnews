var classes = require("./classes.js")
  , collection = require("./collection.js")
  , Array = require("./window.js").Array
  , EventEmitter = null;

EventEmitter = classes.declare(null, {
  on: function (event, fn) {
    this._getCallbacks(event).push(fn);
  },
  off: function (event, fn) {
    collection.remove(this._getCallbacks(event), fn);
  },
  emit: function (event) {
    var callbacks = this._getCallbacks(event)
      , args = Array.prototype.slice.call(arguments, 1);

    collection.each(callbacks, function (_, callback) {
      callback.apply(this, args);
    });
  },
  _getCallbacks: function (event) {
    this._callbacks = this._callbacks || {};
    this._callbacks[event] = this._callbacks[event] || [];

    return this._callbacks[event];
  }
});

module.exports = {
  EventEmitter: EventEmitter
};
