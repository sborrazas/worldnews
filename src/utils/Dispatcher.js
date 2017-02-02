import collection from "./collection.js";

class Dispatcher {
  register(callback) {
    var callbacks = this._getCallbacks();

    callbacks.push(callback);

    return callbacks.length - 1;
  }
  dispatch(payload) {
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

    collection.each(callbacks, (index) => {
      if (!promises[index]) {
        promises[index] = new Promise((resolve, reject) => {
          resolves[index] = resolve;
          rejects[index] = reject;
        });
      }
    });

    collection.each(callbacks, (index, callback) => {
      Promise.resolve(callback(payload)).then(() => {
        if (resolves[index]) {
          resolves[index](true);
        }
      }, () => {
        rejects[index](new Error("Dispatcher callback unsuccessful"));
      });
    });

    this._isDispatching = false;
  }
  waitFor(tokens) {
    var promises = null
      , selectedPromises;

    if (!this._isDispatching) {
      console.error("Not dispatching.");
      return;
    }

    promises = this._getPromises();
    collection.each(tokens, (_, token) => {
      selectedPromises.push(promises[token]);
    });

    return Promise.all(selectedPromises);
  }
  _getCallbacks() {
    return (this._callbacks = this._callbacks || []);
  }
  _getPromises() {
    return (this._promises = this._promises || {});
  }
};

export default Dispatcher;
