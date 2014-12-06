var Base = require("./Base.js")
  , classes = require("../../utils/classes.js")
  , ajax = require("../../utils/ajax.js")
  , collection = require("../../utils/collection.js")
  , sprintf = require("../../utils/sprintf.js")
  , serializer = require("../../utils/serializer.js")
  , settings = require("../../config/settings.js");

module.exports = classes.declare(Base, {
  loadNext: function () {
    var self = this
      , subreddit = settings.DEFAULT_SUBREDDIT
      , subredditURL = sprintf(settings.SUBREDDIT_URL, subreddit)
      , params = { limit: settings.POSTS_PER_PAGE }
      , posts = null;

    if (this._afterToken) {
      params.after = this._afterToken;
    }

    posts = ajax.get(serializer.encodeURL(subredditURL, params));

    return posts.then(function (postsData) {
      var posts = collection.map(postsData.data.children, function (postData) {
        postData = postData.data;

        return {
          id: postData.name,
          title: postData.title,
          redditURL: [settings.REDDIT_URL, postData.permalink].join(""),
          url: postData.url,
          commentsCount: postData.num_comments,
          domainURL: "http://" + postData.domain,
          domainSlug: postData.domain.replace(/\.com?.*/, "").replace(/\./g, " ")
        };
      });

      self._afterToken = postsData.data.after;
      self._items = self._items.concat(posts);

      return posts;
    });
  }
});
