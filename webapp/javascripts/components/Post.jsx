var React = require("React");

module.exports = React.createClass({
  render: function () {
    var post = this.props.post
      , postFigure = null;

    if (post.imageURL) {
      postFigure = (
        <figure className="card-figure">
          <a href={post.url}>
            <img className="card-image" src={post.imageURL} alt={post.title} />
          </a>
        </figure>
      );
    }

    return (
      <article className="cardDashboard-item card">
        {postFigure}
        <div className="card-content">
          <header>
            <a className="card-title" href={post.url}>
              <h2>{post.title}</h2>
            </a>
          </header>
          <p className="card-description">{post.description}</p>
          <footer className="card-footer">
            <ul>
              <li className="card-mainNavItem">
                <a className="link" href={post.redditURL}>
                  {post.commentsCount} comments
                </a>
              </li>
              <li className="card-secondaryNavItem">
                <a className="tag" href={post.domainURL}>{post.domainSlug}</a>
              </li>
            </ul>
          </footer>
        </div>
      </article>
    );
  }
});
