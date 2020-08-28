import React, { Component } from "react";
import { Grid, Button, Input, Image } from "semantic-ui-react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
  }

  setKeyword = (e) => {
    const { value } = e.target;
    this.setState({ keyword: value });
  };

  onKeyupSearch = (e) => {
    if (e.keyCode !== 13) return;
    this.props.onSearch(this.state.keyword);
  };

  render() {
    const { onSearch } = this.props;

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "5px",
            }}
          >
            <Image src="./icon/multi_icon.png" size="medium"></Image>
            <Image src="./icon/band_icon.png" size="tiny"></Image>
          </div>

          <Input
            fluid
            icon="question"
            iconPosition="left"
            placeholder="뭣이 궁금헌디?"
            style={{ marginBottom: "5px", height: "45px" }}
            onChange={(e) => this.setKeyword(e)}
            onKeyUp={(e) => this.onKeyupSearch(e)}
          />
          <Button
            color="orange"
            fluid
            size="large"
            onClick={() => onSearch(this.state.keyword)}
          >
            Search
          </Button>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Search;
