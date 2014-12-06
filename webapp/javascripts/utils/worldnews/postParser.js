var ajax = require("../ajax.js")
  , serializer = require("../serializer.js")
  , json = require("../json.js")
  , sprintf = require("../sprintf.js")
  , settings = require("../../config/settings.js");

module.exports = {
  parse: function (url, cache) {
    var val;

    if (cache) {
      val = localStorage[url];
      if (val) {
        return Promise.resolve(json.parse(val));
      }
      else {
        return this._getMetadata(url).then(function (metadata) {
          localStorage[url] = json.stringify(metadata);

          return metadata;
        });
      }
    }
    else {
      return this._getMetadata(url);
    }
  },
  _getMetadata: function (url) {
    var encodedURL = serializer.encodeURI(url)
      , openGraphURL = sprintf(settings.OPEN_GRAPH_URL, encodedURL)
      , pageContent = ajax.getCrossOrigin(openGraphURL);

    return pageContent.then(function (content) {
      var postOGData = content.openGraph;

      return {
        description: postOGData.description,
        imageURL: postOGData.image
      };
    });
  }
};
