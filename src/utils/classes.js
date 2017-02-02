import object from "./object.js";

export default {
  declare: (Parent, childProperties) => {
    var Class = function () {
      if (childProperties.initialize) {
        childProperties.initialize.apply(this, arguments);
      }
    };

    if (Parent) {
      Class.prototype = new Parent();
    }

    if (childProperties) {
      object.extends(Class.prototype, childProperties);
    }

    return Class;
  }
};
