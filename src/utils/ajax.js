import serializer from "./serializer.js";

const CALLBACKS_PREFIX = "worldnews_";

const doRequest = function (method, url, params) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();

    url = serializer.encodeURL(url, params);

    request.open(method, url, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        resolve(JSON.parse(request.responseText));
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

export default {
  get: (url, params) => {
    return doRequest("GET", url, params);
  },
  getCrossOrigin: (url, params) => {
    return new Promise((resolve, reject) => {
      var scriptEl = document.createElement("script")
        , randomSuffix = Math.floor(Math.random() * 100000000)
        , callbackName = CALLBACKS_PREFIX + randomSuffix;

      params = params || {};
      params.callback = callbackName;
      url = serializer.encodeURL(url, params);

      window[callbackName] = (data) => {
        resolve(data);
      };

      scriptEl.async = true;
      scriptEl.src = url;
      scriptEl.addEventListener("load", () => {
        scriptEl.remove();
        delete window[callbackName];
      });
      scriptEl.addEventListener("error", () => {
        scriptEl.remove();
        delete window[callbackName];
        reject();
      });

      document.body.appendChild(scriptEl);
    });
  }
};
