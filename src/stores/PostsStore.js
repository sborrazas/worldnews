import Store from "utils/Store.js";
import RedditPosts from "./collections/RedditPosts.js";
import AppDispatcher from "../dispatchers/AppDispatcher.js";
import postParser from "utils/worldnews/postParser.js";
import collection from "utils/collection.js";
import object from "utils/object.js";
import { VIEW_ACTIONS } from "config/constants.js";

const store = new Store(AppDispatcher);

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
  _isLoading: false,
  _dispatcherToken: AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
      case VIEW_ACTIONS.INIT:
        store._loadNext();
        break;
      case VIEW_ACTIONS.SCROLL_END:
        store._loadNext();
        break;
    }
  }),
  _loadNext: function () {
    var self = this
      , nextPosts = null;

    if (self._isLoading) {
      return;
    }

    self._isLoading = true;
    self.emit("change");
    nextPosts = this._posts.loadNext();

    nextPosts.then(function (posts) {
      collection.each(posts, function (_, post) {
        self._getPostInfo(post);
      });
      self._isLoading = false;
      self.emit("change");
    });

    nextPosts.catch(function () { // TODO: Better handling (alert message?)
      alert("An error ocurred while trying to load posts from Reddit.");
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

export default store;
