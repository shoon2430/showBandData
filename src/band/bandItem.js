import React, { Component } from "react";

class bandItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const photo_url = this.props.item.photos[0].url;
    const photo_height = this.props.item.photos[0].height;
    const photo_width = this.props.item.photos[0].width;
    return (
      <div>
        <img src={photo_url} alt="" height={photo_height} width={photo_width} />
      </div>
    );
  }
}

export default bandItem;
