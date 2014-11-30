var object = require("./object.js")
  , window = require("./window.js");

module.exports = {
  encodeQuery: function (params) {
    var query = [];

    object.each(params, function (key, val) {
      query.push(this.encodeURI(key) + "=" + this.encodeURI(val));
    });

    return query.join("&");
  },
  encodeURI: function (value) {
    return window.encodeURIComponent(value);
  },
  encodeURL: function (url, params) {
    var query = this.encodeQuery(params);

    if (query.length > 0) {
      return url + "?" + query;
    }
    else {
      return url;
    }
  }
};
