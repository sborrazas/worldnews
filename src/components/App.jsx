/* Base styles. TODO: Import them from somewhere else */
import "./styles/application.less";

import React, { Component } from "react";
import Post from "./Post.jsx";
import Loader from "./Loader.jsx";
import collection from "utils/collection.js";
import PostsStore from "../stores/PostsStore.js";

const MIN_POST_WIDTH = 310; // px
const MAX_COLUMNS = 3;

class App extends Component {
  constructor(props) {
    super(props);

    const { containerWidth } = this.props;

    let columnsCount = Math.floor(containerWidth / MIN_POST_WIDTH);

    if (columnsCount > MAX_COLUMNS) {
      columnsCount = MAX_COLUMNS;
    }
    else if (columnsCount <= 0) {
      columnsCount = 1;
    }

    this.state = {
      posts: PostsStore.getPosts(),
      isLoading: PostsStore.isLoading(),
      columnsCount: columnsCount
    };

    this._onChange = this._onChange.bind(this);
    this._sortCardsPositioning = this._sortCardsPositioning.bind(this);
    this._getCardWidth = this._getCardWidth.bind(this);
  }
  componentDidMount() {
    PostsStore.onChange(this._onChange);
  }
  componentWillUnmount() {
    PostsStore.removeOnChangeListener(this._onChange);
  }
  componentDidUpdate() {
    this._sortCardsPositioning();
  }
  render() {
    const { isLoading, posts } = this.state;
    const cardWidth = this._getCardWidth();

    return (
      <div>
        <div className="cardDashboard">
          {
            collection.map(posts, (post) => {
              return (
                <Post post={post} ref={post.id} key={post.id} width={cardWidth} />
              );
            })
          }
        </div>
        {
          isLoading &&
            (<Loader ref="loader" />)
        }
      </div>
    );
  }
  _onChange() {
    this.setState({
      posts: PostsStore.getPosts(),
      isLoading: PostsStore.isLoading(),
    });
  }
  _sortCardsPositioning() {
    const { posts } = this.state;
    const { loader } = this.refs;

    var positionY = 0
      , columnsCount = this.state.columnsCount
      , columnMaxY = []
      , longestColumn = 0;

    collection.eachInRange(0, columnsCount, () => {
      columnMaxY.push(0);
    });

    // Posts
    collection.each(posts, (_, post) => {
      const postEl = this.refs[post.id]
      let shortestColumn = 0;

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
  }
  _getCardWidth() {
    return Math.floor(this.props.containerWidth / this.state.columnsCount);
  }
}

export default App;
