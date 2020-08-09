import React, { Component } from "react";
import { Pagination, Image, Container } from "semantic-ui-react";

class bandItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }
  render() {
    const photo_url = this.props.item.photos[0].url;
    return <Image src={photo_url} alt="" />;
  }
}

export default bandItem;
