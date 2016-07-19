var object = require("../utils/object.js")
  , Dispatcher = require("../utils/Dispatcher.js")
  , dispatcher = new Dispatcher();

object.extends(dispatcher, {
  handleViewAction: function (action) {
    this.dispatch({
      source: "VIEW_ACTION",
      action: action
    });
  }
});

module.exports = dispatcher;
