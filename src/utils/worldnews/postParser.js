import sprintf from "../sprintf.js";
import ajax from "../ajax.js";
import serializer from "../serializer.js";
import { OPEN_GRAPH_URL, OPEN_GRAPH_APP_ID } from "config/settings.js";

const getMetadata = (url) => {
  const encodedURL = serializer.encodeURI(url)
  const openGraphURL = sprintf(OPEN_GRAPH_URL, encodedURL);
  const pageContent = ajax.getCrossOrigin(openGraphURL, {
    app_id: OPEN_GRAPH_APP_ID,
  });

  return pageContent.then(function (content) {
    var postOGData = content.openGraph;

    return {
      description: postOGData.description,
      imageURL: postOGData.image
    };
  }, function (aaa) {
    return {};
  });
};

export default {
  parse: (url, cache) => {
    var val;

    if (cache) {
      val = localStorage[url];

      if (val) {
        return Promise.resolve(JSON.parse(val));
      }
      else {
        return getMetadata(url).then((metadata) => {
          localStorage[url] = JSON.stringify(metadata);

          return metadata;
        });
      }
    }
    else {
      return getMetadata(url);
    }
  }
};
