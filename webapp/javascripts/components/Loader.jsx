var React = require("React");

module.exports = React.createClass({
  getInitialState: function () {
    return {
      spacingTop: 0
    };
  },
  render: function () {
    var style = { top: this.state.spacingTop };

    return (<div className="loader" style={style}></div>);
  },
  setLayoutPosition: function (spacingTop) {
    this.setState({ spacingTop: spacingTop });
  }
});
