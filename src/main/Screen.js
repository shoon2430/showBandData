import React, { Component } from "react";

class Screen extends Component {
  render() {
    const { allData, keyword } = this.props;
    console.log(allData);

    console.log(keyword);

    return <div>HELLO</div>;
  }
}

export default Screen;
