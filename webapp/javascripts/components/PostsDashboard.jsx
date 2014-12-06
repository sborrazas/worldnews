var React = require("React")
  , Post = require("./Post.jsx")
  , Loader = require("./Loader.jsx")
  , PostsStore = require("../stores/PostsStore.js")
  , collection = require("../utils/collection.js")
  , Math = require("../utils/Math.js")
  , MIN_POST_WIDTH = 310 // px
  , MAX_COLUMNS = 3

module.exports = React.createClass({
  getInitialState: function () {
    var columnsCount = Math.floor(this.props.containerWidth / MIN_POST_WIDTH);

    if (columnsCount > MAX_COLUMNS) {
      columnsCount = MAX_COLUMNS;
    }
    else if (columnsCount < 0) {
      columnsCount = 1;
    }

    return {
      posts: PostsStore.getPosts(),
      isLoading: PostsStore.isLoading(),
      columnsCount: columnsCount
    };
  },
  componentDidMount: function () {
    PostsStore.onChange(this._onChange);
  },
  componentWillUnmount: function () {
    PostsStore.removeOnChangeListener(this._onChange);
  },
  componentDidUpdate: function () {
    this._sortCardsPositioning();
  },
  render: function () {
    var loader = null
      , posts = null
      , cardWidth = this._getCardWidth();

    if (this.state.isLoading) {
      loader = (<Loader ref="loader" />);
    }

    posts = collection.map(this.state.posts, function (post) {
      return (<Post post={post} ref={post.id} key={post.id} width={cardWidth} />);
    });

    return (<div><div className="cardDashboard">{posts}</div>{loader}</div>);
  },
  _onChange: function () {
    this.setState({
      posts: PostsStore.getPosts(),
      isLoading: PostsStore.isLoading()
    });
  },
  _sortCardsPositioning: function () {
    var self = this
      , positionY = 0
      , columnsCount = this.state.columnsCount
      , columnMaxY = []
      , longestColumn = 0
      , loader = self.refs["loader"];

    collection.eachInRange(0, columnsCount, function (_) {
      columnMaxY.push(0);
    });

    // Posts
    collection.each(self.state.posts, function (_, post) {
      var postEl = self.refs[post.id]
        , shortestColumn = 0;

      collection.eachInRange(1, columnsCount, function (column) {
        if (columnMaxY[column] < columnMaxY[shortestColumn]) {
          shortestColumn = column;
        }
      });

      postEl.setLayoutPosition(shortestColumn, columnMaxY[shortestColumn]);
      columnMaxY[shortestColumn] += postEl.getHeight();
    });

    // Loader
    if (loader) {
      collection.eachInRange(1, columnsCount, function (column) {
        if (columnMaxY[column] > columnMaxY[longestColumn]) {
          longestColumn = column;
        }
      });

      loader.setLayoutPosition(columnMaxY[longestColumn]);
    }
  },
  _getCardWidth: function () {
    return Math.floor(this.props.containerWidth / this.state.columnsCount);
  }
});
