import React, { Component } from "react";

class Loader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spacingTop: 0,
    };
  }
  render() {
    var style = { top: this.state.spacingTop };

    return (
      <div className="loader" style={style}></div>
    );
  }
  setLayoutPosition(spacingTop) {
    this.setState({ spacingTop: spacingTop });
  }
}

export default Loader;
