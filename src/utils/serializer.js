var object = require("./object.js")
  , window = require("./window.js")
  , serializer = null;

serializer = {
  encodeQuery: function (params) {
    var query = [];

    object.each(params, function (key, val) {
      query.push(serializer.encodeURI(key) + "=" + serializer.encodeURI(val));
    });

    return query.join("&");
  },
  encodeURI: function (value) {
    return window.encodeURIComponent(value);
  },
  encodeURL: function (url, params) {
    var query = serializer.encodeQuery(params);

    if (query.length > 0) {
      return url + "?" + query;
    }
    else {
      return url;
    }
  }
};

module.exports = serializer;
