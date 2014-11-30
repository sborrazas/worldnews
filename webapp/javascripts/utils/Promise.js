var classes = require("./classes.js")
  , object = require("./object.js")
  , Promise;

Promise = classes.declare(null, {
  initialize: function (handle) {
    var self = this
      , fulfilled = null
      , rejected = null;

    self._state = "pending";
    self._payload = null;
    self._handler = {};

    fulfilled = function (payload) {
      self._state = "resolved";
      self._payload = payload;
      self._handle();
    };
    rejected = function (payload) {
      self._state = "rejected";
      self._payload = payload;
      self._handle();
    };

    handle(fulfilled, rejected);
  },
  then: function (onResolved, onRejected) {
    var self = this;

    return new Promise(function (resolve, reject) {
      self._handle({
        onResolved: onResolved,
        onRejected: onRejected,
        resolve: resolve,
        reject: reject
      });
    });
  },
  catch: function (onRejected) {
    var self = this;

    return new Promise(function (resolve, reject) {
      self._handle({
        onRejected: onRejected,
        resolve: resolve,
        reject: reject
      });
    });
  },
  always: function (onAlways) {
    this._handle({
      onAlways: onAlways
    });
  },
  _handle: function (handlerProps) {
    var handlerCallback = null
      , handler = this._handler;

    if (handlerProps) {
      object.extends(handler, handlerProps);
    }

    if (this._state === "pending") {
      return;
    }

    if (this._state === "resolved") {
      handlerCallback = handler.onResolved;
    }
    else {
      handlerCallback = handler.onRejected;
    }

    if (handlerCallback) {
      try {
        handler.resolve(handlerCallback(this._payload));
      }
      catch (e) {
        handler.reject(e);
      }
    }
    else if (this._state === "resolved" && handler.resolve) {
      handler.resolve(this._payload);
    }
    else if (this._state === "rejected" && handler.reject) {
      handler.reject(this._payload);
    }
    if (handler.onAlways) {
      handler.onAlways(this._payload);
    }
  }
});

Promise.isPromise = function (obj) {
  return obj instanceof Promise;
};

Promise.all = function (promises) {
  return collection.reduce(promises, new Promise(), function (acc, promise) {
    return acc.then(function (vals) {
      return promise.then(function (val) {
        return vals.concat(val);
      });
    });
  });
};

Promise.resolve = function (fulfillVal) {
  if (Promise.isPromise(fulfillVal)) {
    return fulfillVal;
  }
  else {
    return new Promise(function (resolve) {
      resolve(fulfillVal);
    });
  }
};

module.exports = Promise;
