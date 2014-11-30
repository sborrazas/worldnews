var classes = require("../../utils/classes.js")
  , collection = require("../../utils/collection.js");

module.exports = classes.declare(null, {
  initialize: function () {
    this._items = [];
  },
  getItems: function () {
    return this._items;
  }
});
