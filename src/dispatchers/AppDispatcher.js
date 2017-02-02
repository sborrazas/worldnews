import object from "utils/object.js";
import Dispatcher from "utils/Dispatcher.js";

const dispatcher = new Dispatcher();

dispatcher.handleViewAction = (action) => {
  dispatcher.dispatch({
    source: "VIEW_ACTION",
    action: action
  });
};

export default dispatcher;
