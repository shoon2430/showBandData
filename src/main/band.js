import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import Loading from "./Loading";
import NaverBandApi from "./Api";
import Search from "./Search";
import Screen from "./Screen";

class band extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allBandPosts: [],
      searchKeyword: null,
    };
  }

  // 검색시 검색 키워드 설정
  setSearchKeyword = (keyword) => {
    this.setState({ searchKeyword: keyword });
  };

  componentDidMount() {
    NaverBandApi().then((data) => this.setState({ allBandPosts: data }));
  }

  render() {
    const { allBandPosts, searchKeyword } = this.state;

    return (
      <Container>
        {allBandPosts.length !== 0 ? (
          searchKeyword ? (
            // 검색 했을경우
            <Screen allData={allBandPosts} keyword={searchKeyword} />
          ) : (
            // 기본 화면
            <Search onSearch={this.setSearchKeyword} />
          )
        ) : (
          // 데이터를 가지고 올 때 까지 로딩
          <Loading />
        )}
      </Container>
    );
  }
}

export default band;
