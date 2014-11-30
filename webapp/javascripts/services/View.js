var AppDispatcher = require("../dispatchers/AppDispatcher.js")
  , VIEW_ACTIONS = require("../config/constants.js").VIEW_ACTIONS;

module.exports = {
  init: function () {
    AppDispatcher.handleViewAction({
      actionType: VIEW_ACTIONS.INIT
    });
  },
  scrollEnd: function () {
    AppDispatcher.handleViewAction({
      actionType: VIEW_ACTIONS.SCROLL_END
    });
  }
};
