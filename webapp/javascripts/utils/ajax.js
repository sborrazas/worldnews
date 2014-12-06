var Promise = require("./Promise.js")
  , window = require("./window.js")
  , serializer = require("./serializer.js")
  , document = require("./dom/document.js")
  , json = require("./json.js")
  , XMLHttpRequest = window.XMLHttpRequest
  , CALLBACKS_PREFIX = "worldnews_"
  , Math = require("./Math.js")
  , doRequest = null;

doRequest = function (method, url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();

    request.open(method, url, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        resolve(json.parse(request.responseText));
      }
      else {
        reject();
      }
    };
    request.onerror = function () {
      reject();
    };

    request.send();
  });
};

module.exports = {
  get: function (url) {
    return doRequest("GET", url);
  },
  getCrossOrigin: function (url, params) {
    return new Promise(function (resolve, reject) {
      var scriptEl = document.createElement("script")
        , randomSuffix = Math.floor(Math.random() * 100000000)
        , callbackName = CALLBACKS_PREFIX + randomSuffix;

      params = params || {};
      params.callback = callbackName;
      url = serializer.encodeURL(url, params);

      window[callbackName] = function (data) {
        resolve(data);
      };

      scriptEl.async = true;
      scriptEl.src = url;
      scriptEl.addEventListener("load", function () {
        scriptEl.remove();
        delete window[callbackName];
      });

      document.body.appendChild(scriptEl);
    });
  }
};
