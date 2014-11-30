var React = require("React")
  , Post = require("./Post.jsx")
  , PostsStore = require("../stores/PostsStore.js")
  , collection = require("../utils/collection.js");

module.exports = React.createClass({
  getInitialState: function () {
    return {
      posts: PostsStore.getPosts(),
      isLoading: PostsStore.isLoading()
    };
  },
  componentDidMount: function () {
    PostsStore.onChange(this._onChange);
  },
  componentWillUnmount: function () {
    PostsStore.removeOnChangeListener(this._onChange);
  },
  render: function () {
    var loader = null
      , posts = null;

    if (this.state.isLoading) {
      loader = (<div className="loader"></div>);
    }

    posts = collection.map(this.state.posts, function (post) {
      return (<Post post={post} key={post.id} />);
    });

    return (<div><div className="cardDashboard">{posts}</div>{loader}</div>);
  },
  _onChange: function () {
    this.setState({
      posts: PostsStore.getPosts(),
      isLoading:  PostsStore.isLoading()
    });
  }
});
