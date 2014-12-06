var React = require("React")
  , PostsDashboard = require("./components/PostsDashboard.jsx")
  , document = require("./utils/dom/document.js")
  , collection = require("./utils/collection.js")
  , View = require("./services/View.js");

collection.each(document.querySelectorAll(".js-postsDashboard"), function (_, el) {
  React.render(<PostsDashboard containerWidth={el.offsetWidth} />, el);
});

View.init();
