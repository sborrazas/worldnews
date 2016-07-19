var classes = require("./classes.js")
  , EventEmitter = require("./events.js").EventEmitter;

module.exports = classes.declare(EventEmitter, {
  initialize: function (dispatcher) {
    this._dispatcher = dispatcher;
  }
});
