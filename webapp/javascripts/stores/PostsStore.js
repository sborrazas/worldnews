var object = require("../utils/object.js")
  , AppDispatcher = require("../dispatchers/AppDispatcher.js")
  , VIEW_ACTIONS = require("../config/constants.js").VIEW_ACTIONS
  , Store = require("../utils/Store.js")
  , collection = require("../utils/collection.js")
  , postParser = require("../utils/worldnews/postParser.js")
  , RedditPosts = require("./collections/RedditPosts.js")
  , store = new Store(AppDispatcher);

object.extends(store, {
  getPosts: function () {
    return this._posts.getItems();
  },
  isLoading: function () {
    return this._isLoading;
  },
  onChange: function (callback) {
    this.on("change", callback);
  },
  removeOnChangeListener: function (callback) {
    this.off("change", callback);
  },
  _posts: new RedditPosts(),
  _isLoading: true,
  _dispatcherToken: AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
      case VIEW_ACTIONS.INIT:
        store._loadNext();
        break;
      case VIEW_ACTIONS.SCROLL_END:
        if (!this._isLoading) {
          store._loadNext();
        }
        break;
    }
  }),
  _loadNext: function () {
    var self = this
      , nextPosts = this._posts.loadNext();

    self._isLoading = true;
    self.emit("change");

    nextPosts.then(function (posts) {
      collection.each(posts, function (_, post) {
        self._getPostInfo(post);
      });
    });

    nextPosts.catch(function () { // TODO: Better handling (alert message?)
      alert("An error ocurred while trying to load posts from Reddit.");
    });

    nextPosts.always(function () {
      self._isLoading = false;
      self.emit("change");
    });
  },
  _getPostInfo: function (post) {
    var self = this;

    postParser.parse(post.url, true).then(function (info) {
      post.description = info.description;
      post.imageURL = info.imageURL;
      self.emit("change");
    });
  }
});

module.exports = store;
