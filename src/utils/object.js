module.exports = {
  each: function (obj, iterator) {
    var key;

    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterator.call(null, key, obj[key]);
      }
    }
  },
  merge: function (objA, objB) {
    var newObj = {}
      , iterator = null;

    iterator = function (key, val) {
      newObj[key] = val;
    };

    this.each(objA, iterator);
    this.each(objB, iterator);

    return newObj;
  },
  extends: function (base, properties) {
    this.each(properties, function (key, val) {
      base[key] = val;
    });
  }
};
