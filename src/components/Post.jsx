import React, { Component } from "react";

var on = require("../utils/dom/on.js");

const MARGIN_WIDTH = 10;

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnIndex: 0,
      imageMarginTop: 0,
      spacingTop: 0,
    };
  }
  render() {
    const { imageMarginTop, columnIndex, spacingTop } = this.state;
    const { post, width } = this.props;

    const style = {
      width: (width - MARGIN_WIDTH * 2),
      left: (columnIndex * width + MARGIN_WIDTH),
      top: spacingTop,
    };

    return (
      <article className="cardDashboard-item card" style={style}>
        {
          post.imageURL &&
            (
              <figure className="card-figure" ref="figure">
                <a href={post.url} target="_blank">
                  <img className="card-image" src={post.imageURL} alt={post.title}
                       style={{ marginTop: imageMarginTop }} />
                </a>
              </figure>
            )
        }
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
  }
  getHeight() {
    var height = this.refs["content"].offsetHeight
      , figure = this.refs["figure"];

    height += MARGIN_WIDTH * 2

    if (figure) {
      height += figure.offsetHeight;
    }

    return height;
  }
  setLayoutPosition(columnIndex, spacingTop) {
    this.setState({ columnIndex: columnIndex, spacingTop: spacingTop });
  }
  componentDidUpdate() {
    const { image } = this.refs;

    if (image) {
      on(image, "load", () => {
        self._repositionImage();
      });
      if (image.complete) {
        self._repositionImage();
      }
    }
  }
  _repositionImage() {
    const { figure } = this.refs;
    const heightDifference = figure.offsetHeight - image.offsetHeight;

    this.setState({ imageMarginTop: (heightDifference / 2) });
  }
}

export default Post;
