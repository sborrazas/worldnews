import on from "./on.js";

const SCROLL_TRIGGER_DISTANCE = 100 // px

export default {
  onInit: (handler) => {
    handler.call(window);
  },
  onLocalStorageChange: (handler) => {
    on(global, "storage", handler);
  },
  onScrollReachBottom: (handler) => {
    var body = document.body;

    on(document, "scroll", (event) => {
      let bottomPosition = body.clientHeight + SCROLL_TRIGGER_DISTANCE;;

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
