import object from "./object.js";

const serializer = {
  encodeQuery: (params) => {
    var query = [];

    object.each(params, (key, val) => {
      query.push(serializer.encodeURI(key) + "=" + serializer.encodeURI(val));
    });

    return query.join("&");
  },
  encodeURI: (value) => {
    return window.encodeURIComponent(value);
  },
  encodeURL: (url, params) => {
    var query = serializer.encodeQuery(params);

    if (query.length > 0) {
      return url + "?" + query;
    }
    else {
      return url;
    }
  }
};

export default serializer;
