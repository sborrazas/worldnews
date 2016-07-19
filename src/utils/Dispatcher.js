var classes = require("./classes.js")
  , Promise = require("./Promise.js")
  , collection = require("./collection.js")
  , console = require("./console.js");

module.exports = classes.declare(null, {
  register: function (callback) {
    var callbacks = this._getCallbacks();

    callbacks.push(callback);

    return callbacks.length - 1;
  },
  dispatch: function (payload) {
    var callbacks = null
      , promises = null
      , resolves = {}
      , rejects = {};

    if (this._isDispatching) {
      console.error("Already dispatching.");
      return;
    }

    this._isDispatching = true;

    callbacks = this._getCallbacks();
    promises = this._getPromises();

    collection.each(callbacks, function (index) {
      if (!promises[index]) {
        promises[index] = new Promise(function (resolve, reject) {
          resolves[index] = resolve;
          rejects[index] = reject;
        });
      }
    });

    collection.each(callbacks, function (index, callback) {
      Promise.resolve(callback(payload)).then(function () {
        resolves[index](true);
      }, function () {
        rejects[index](new Error("Dispatcher callback unsuccessful"));
      });
    });

    this._isDispatching = false;
  },
  waitFor: function (tokens) {
    var promises = null
      , selectedPromises;

    if (!this._isDispatching) {
      console.error("Not dispatching.");
      return;
    }

    promises = this._getPromises();
    collection.each(tokens, function (_, token) {
      selectedPromises.push(promises[token]);
    });

    return Promise.all(selectedPromises);
  },
  _getCallbacks: function () {
    return (this._callbacks = this._callbacks || []);
  },
  _getPromises: function () {
    return (this._promises = this._promises || {});
  }
});
