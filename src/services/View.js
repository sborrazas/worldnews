import AppDispatcher from "../dispatchers/AppDispatcher.js";
import { VIEW_ACTIONS } from "config/constants.js";

export default {
  init: () => {
    AppDispatcher.handleViewAction({
      actionType: VIEW_ACTIONS.INIT
    });
  },
  scrollEnd: () => {
    AppDispatcher.handleViewAction({
      actionType: VIEW_ACTIONS.SCROLL_END
    });
  }
};
