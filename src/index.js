import React from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import App from "components/App.jsx";
import StaticApp from "components/StaticApp.jsx";
import global from "utils/dom/global.js";
import View from "./services/View.js";

const MAX_WIDTH = 1010;

// Client render
if (typeof document !== "undefined") {
  const el = document.getElementById("app");
  const width = Math.min(
    MAX_WIDTH,
    el.offsetWidth
  );
  const props = {
    containerWidth: width,
  };

  ReactDOM.render(
    React.createElement(App, props),
    el
  );

  global.onInit(() => {
    View.init();
  });

  global.onScrollReachBottom(() => {
    View.scrollEnd();
  });
}

// Exported static site renderer:
export default (locals, callback) => {
  const props = { locals: locals };
  const content = ReactDOMServer.renderToStaticMarkup(
    React.createElement(StaticApp, props)
  );

  callback(null, content);
};
