var window = require("../window.js")
  , on = require("./on.js")
  , document = require("./document.js");

module.exports = {
  onInit: function (handler) {
    handler.call(window);
  },
  onLocalStorageChange: function (handler) {
    on(window, "storage", handler);
  },
  onScrollReachBottom: function (handler) {
    var body = document.body;

    on(document, "scroll", function (event) {
      var SCROLL_TRIGGER_DISTANCE = 100 // px
        , bottomPosition = body.clientHeight + SCROLL_TRIGGER_DISTANCE;;

      if (document.documentElement.scrollTop > body.scrollTop) {
        bottomPosition += document.documentElement.scrollTop;
      }
      else {
        bottomPosition += body.scrollTop;
      }

      if (bottomPosition > body.scrollHeight) {
        handler.call(body, event);
      }
    });
  }
};
