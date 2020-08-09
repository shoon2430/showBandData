import React, { Component } from "react";
import axios from "axios";
import BandItem from "./bandItem";
import { Container, Menu, Input, Pagination, Header } from "semantic-ui-react";

class band extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "식단표",
      band_item: null,
      lodding: false,
      band_data: null,
      page: 1,
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  getBandData(activeItem) {
    let band_item = [];

    this.state.band_data.map((item) => {
      const content = item.content.replace(/(?:\r\n|\r|\n)/g, "<br/>");
      if (content.lastIndexOf(activeItem) > 0) {
        band_item.push(item);
      }
    });
    return band_item;
  }

  componentDidMount() {
    const fetchData = async () => {
      // 데이터 가져오기 시작
      this.setState({ lodding: true });
      //    네이버 밴드키 가져오기
      const access_token = process.env.REACT_APP_NAVER_BAND_KEY;
      const url = `https://openapi.band.us/v2.1/bands?access_token=${access_token}`;
      const band_key = await axios.get(url).then((res) => {
        return res.data.result_data.bands[0].band_key;
      });

      //   네이버 밴드글 데이터 가져오기
      const get_band_url = `https://openapi.band.us/v2/band/posts?access_token=${access_token}&band_key=${band_key}&locale=en_kr`;
      axios.get(get_band_url).then((res) => {
        const band_data = res.data.result_data.items;
        this.setState({ band_data: band_data });
        this.setState({ band_item: this.getBandData("식단표") });
      });
      // 데이터 가져오기 종료
      this.setState({ lodding: false });
    };

    fetchData();
  }

  handleItemClick(e) {
    const activeItem = e.target.textContent;
    this.setState({ activeItem: activeItem });
    this.setState({ page: 1 });
    this.setState({ band_item: this.getBandData(activeItem) });
  }

  handlePagination(e) {
    const page = e.target.getAttribute("value");
    this.setState({ page: page });
  }

  render() {
    const page = this.state.page;
    const band_item = this.state.band_item;
    const activeItem = this.state.activeItem;
    return (
      <div>
        <Menu pointing>
          <Menu.Item
            name="식단표"
            active={activeItem === "식단표"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="시간표"
            active={activeItem === "시간표"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="출석표"
            active={activeItem === "출석표"}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Container textAlign="center">
          <Header as="h1">{activeItem}</Header>
          {/* band_item이 null인 경우는 오류발생함 */}
          {band_item !== null ? <BandItem item={band_item[page - 1]} /> : ""}

          {band_item !== null ? (
            <Pagination
              boundaryRange={0}
              defaultActivePage={1}
              activePage={this.state.page}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              totalPages={band_item.length}
              onClick={this.handlePagination}
            />
          ) : (
            ""
          )}
        </Container>
      </div>
    );
  }
}

export default band;
