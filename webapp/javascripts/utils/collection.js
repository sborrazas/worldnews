module.exports = {
  each: function (collection, iterator) {
    var i = 0
      , len = collection.length
      , res = null;

    for (; i < len; i += 1) {
      res = iterator.call(null, i, collection[i]);
      if (res === false) break;
    }
  },
  map: function (collection, fn) {
    var newCollection = [];

    this.each(collection, function (_, item) {
      newCollection.push(fn.call(null, item));
    });

    return newCollection;
  },
  reduce: function (collection, initialAcc, fn) {
    var acc = initialAcc;

    this.each(collection, function (_, item) {
      acc = fn.call(null, acc, item);
    });

    return acc;
  },
  eachInRange: function (start, end, fn) {
    var i = start;

    for (; i < end; i += 1) {
      fn.call(null, i);
    }
  }
};
