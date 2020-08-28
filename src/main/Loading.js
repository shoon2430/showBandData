import React from "react";
import ReactLoading from "react-loading";
import { Grid } from "semantic-ui-react";

const Loading = () => {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 200 }}>
        <ReactLoading
          type="spokes"
          color="#9cff57"
          height={"90%"}
          width={"90%"}
        />
      </Grid.Column>
    </Grid>
  );
};

export default Loading;
