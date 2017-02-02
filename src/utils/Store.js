import { EventEmitter } from "./events.js";

class Store extends EventEmitter {
  constructor(dispatcher) {
    super();

    this._dispatcher = dispatcher;
  }
}

export default Store;
