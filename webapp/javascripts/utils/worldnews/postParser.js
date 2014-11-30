var ajax = require("../ajax.js")
  , serializer = require("../serializer.js")
  , sprintf = require("../sprintf.js")
  , settings = require("../../config/settings.js");

module.exports = {
  parse: function (url) {
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
