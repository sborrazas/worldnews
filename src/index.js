var React = require("React")
  , PostsDashboard = require("./components/PostsDashboard.jsx")
  , document = require("./utils/dom/document.js")
  , collection = require("./utils/collection.js")
  , global = require("./utils/dom/global.js")
  , View = require("./services/View.js");

collection.each(document.querySelectorAll(".js-postsDashboard"), function (_, el) {
  React.render(<PostsDashboard containerWidth={el.offsetWidth} />, el);
});

global.onInit(function () {
  View.init();
});

global.onScrollReachBottom(function () {
  View.scrollEnd();
});
