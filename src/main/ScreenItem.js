import React, { Component } from "react";
import { Grid, Card, Pagination, Image } from "semantic-ui-react";

class ScreenItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePage: 1,
    };
  }

  handlePagination = (e) => {
    const page = e.target.getAttribute("value");
    this.setState({ imagePage: page });
  };

  render() {
    const { item } = this.props;

    return (
      <Grid.Row>
        <Card>
          <Card.Header>{item.content}</Card.Header>
          {/* 이미지가 없는 글도 있을 수 있음 */}
          {item.photos.length !== 0 ? (
            <Image
              src={item.photos[this.state.imagePage - 1].url}
              wrapped
              ui={false}
            />
          ) : (
            ""
          )}
          {/* 이미지가 많은 글도 있을 수 있음 */}
          {item.photos.length > 1 ? (
            <Card.Description
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                boundaryRange={0}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={2}
                activePage={this.state.imagePage}
                totalPages={item.photos.length}
                onClick={this.handlePagination}
              />
            </Card.Description>
          ) : (
            ""
          )}
        </Card>
      </Grid.Row>
    );
  }
}

export default ScreenItem;
