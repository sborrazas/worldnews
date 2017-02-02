import Base from "./Base.js";
import classes from "utils/classes.js";
import ajax from "utils/ajax.js";
import collection from "utils/collection.js";
import sprintf from "utils/sprintf.js";
import serializer from "utils/serializer.js";
import {
  DEFAULT_SUBREDDIT,
  REDDIT_URL,
  POSTS_PER_PAGE,
  SUBREDDIT_URL,
} from "config/settings.js";

class RedditPosts extends Base {
  loadNext() {
    const subredditURL = sprintf(SUBREDDIT_URL, DEFAULT_SUBREDDIT);
    const params = { limit: POSTS_PER_PAGE };

    if (this._afterToken) {
      params.after = this._afterToken;
    }

    return ajax
      .get(serializer.encodeURL(subredditURL, params))
      .then((postsData) => {
        const posts = collection.map(postsData.data.children, (postData) => {
          postData = postData.data;

          return {
            id: postData.name,
            title: postData.title,
            redditURL: [REDDIT_URL, postData.permalink].join(""),
            url: postData.url,
            commentsCount: postData.num_comments,
            domainURL: "http://" + postData.domain,
            domainSlug: postData.domain.replace(/\.com?.*/, "").replace(/\./g, " ")
          };
        });

        this._afterToken = postsData.data.after;
        this._items = this._items.concat(posts);

        return posts;
      });
  }
}

export default RedditPosts;
