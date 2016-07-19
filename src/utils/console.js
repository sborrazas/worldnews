var window = require("./window.js")
  , console = window.console;

module.exports = {
  error: function () {
    console.error.call(null, arguments);
  },
  info: function () {
    console.info.call(null, arguments);
  }
};
