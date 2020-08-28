import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import ScreenItem from "./ScreenItem";

class Screen extends Component {
  getBandData = (allData, keyword) => {
    let band_item = [];
    keyword = "식단표";

    band_item = allData.map((item, idx) => {
      const content = item.content.replace(/(?:\r\n|\r|\n)/g, "<br/>");
      if (content.lastIndexOf(keyword) > 0) {
        return <ScreenItem key={idx} item={item} />;
      }
    });

    return band_item;
  };

  render() {
    const { allData, keyword } = this.props;

    return (
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "5px",
        }}
      >
        {this.getBandData(allData, keyword)}
      </Grid>
    );
  }
}

export default Screen;
