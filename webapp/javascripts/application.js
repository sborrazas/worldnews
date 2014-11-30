var React = require("React")
  , PostsDashboard = require("./components/PostsDashboard.jsx")
  , postsDashboardEl = document.querySelectorAll(".js-postsDashboard")
  , collection = require("./utils/collection.js")
  , View = require("./services/View.js");

collection.each(postsDashboardEl, function (_, el) {
  React.render(<PostsDashboard />, el);
});

View.init();
