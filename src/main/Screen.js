import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import ScreenItem from "./ScreenItem";

class Screen extends Component {
  getBandData = (allData, keyword) => {
    let band_item = [];

    band_item = allData.map((item, idx) => {
      const content = item.content
        .slice(0, 20)
        .replace(/(?:\r\n|\r|\n)/g, "<br/>");
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
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        {this.getBandData(allData, keyword)}
        <Grid.Row>
          <Button
            color="orange"
            fluid
            size="large"
            onClick={() => {
              window.location.reload(true);
            }}
          >
            뒤로가자
          </Button>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Screen;
