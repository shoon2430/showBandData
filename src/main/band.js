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
    let microBandData = localStorage.microBandData
      ? JSON.parse(localStorage.microBandData)
      : null;
    let microBandCreated = localStorage.microBandData
      ? new Date(localStorage.microBandCreated)
      : null;

    if (microBandData) {
      const now = new Date();
      var fiveMinute = (now.getTime() - microBandCreated.getTime()) / 60000;

      // 5분마다 API데이터 갱신
      if (fiveMinute > 5) {
        NaverBandApi().then((data) => {
          localStorage.microBandData = JSON.stringify(
            localStorage.microBandData
          );
          localStorage.microBandCreated = now;
          this.setState({ allBandPosts: data });
        });
      }

      this.setState({ allBandPosts: microBandData });
    } else {
      NaverBandApi().then((data) => {
        localStorage.microBandData = JSON.stringify(data);
        localStorage.microBandCreated = new Date();
        this.setState({ allBandPosts: data });
      });
    }
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
