var React = require("React")
  , on = require("../utils/dom/on.js")
  , domStyle = require("../utils/dom/style.js")
  , MARGIN_WIDTH = 10;

module.exports = React.createClass({
  getInitialState: function () {
    return {
      columnIndex: 0,
      spacingTop: 0
    };
  },
  render: function () {
    var post = this.props.post
      , postFigure = null
      , style = null;

    if (post.imageURL) {
      postFigure = (
        <figure className="card-figure" ref="figure">
          <a href={post.url} target="_blank">
            <img className="card-image" src={post.imageURL} alt={post.title}
                 ref="image" />
          </a>
        </figure>
      );
    }

    style = {
      width: (this.props.width - MARGIN_WIDTH * 2),
      left: (this.state.columnIndex * this.props.width + MARGIN_WIDTH),
      top: this.state.spacingTop
    };

    return (
      <article className="cardDashboard-item card" style={style}>
        {postFigure}
        <div className="card-content" ref="content">
          <header>
            <a className="card-title" href={post.url} target="_blank">
              <h2>{post.title}</h2>
            </a>
          </header>
          <p className="card-description">{post.description}</p>
          <footer className="card-footer">
            <ul>
              <li className="card-mainNavItem">
                <a className="link" href={post.redditURL} target="_blank">
                  {post.commentsCount} comments
                </a>
              </li>
              <li className="card-secondaryNavItem">
                <a className="tag" href={post.domainURL} target="_blank">
                  {post.domainSlug}
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </article>
    );
  },
  getHeight: function () {
    var height = this.refs["content"].getDOMNode().offsetHeight
      , figure = this.refs["figure"];

    height += MARGIN_WIDTH * 2

    if (figure) {
      height += figure.getDOMNode().offsetHeight;
    }

    return height;
  },
  setLayoutPosition: function (columnIndex, spacingTop) {
    this.setState({ columnIndex: columnIndex, spacingTop: spacingTop });
  },
  componentDidUpdate: function () {
    var self = this
      , image = this.refs["image"]
      , imageEl = null;

    if (image) {
      imageEl = image.getDOMNode();
      on(imageEl, "load", function () {
        self._repositionImage();
      });
      if (imageEl.complete) {
        self._repositionImage();
      }
    }
  },
  _repositionImage: function () {
    var figureHeight = this.refs["figure"].getDOMNode().offsetHeight
      , imageEl = this.refs["image"].getDOMNode()
      , heightDifference = figureHeight - imageEl.offsetHeight;

    domStyle.set(imageEl, "marginTop", (heightDifference / 2) + "px");
  }
});
