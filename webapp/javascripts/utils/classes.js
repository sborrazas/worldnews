var object = require("./object.js");

module.exports = {
  declare: function (Parent, childProperties) {
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
