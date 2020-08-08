import React, { Component } from "react";
import axios from "axios";
import BandItem from "./bandItem";

class band extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: 0,
      selectedCategoryItem: null,
      lodding: false,
      band_data: null,
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      // 데이터 가져오기 시작
      this.setState({ lodding: true });
      //    네이버 밴드키 가져오기
      const access_token = process.env.REACT_APP_NAVER_BAND_KEY;
      const url = `/v2.1/bands?access_token=${access_token}`;
      const band_key = await axios.get(url).then((res) => {
        return res.data.result_data.bands[0].band_key;
      });

      //   네이버 밴드글 데이터 가져오기
      const get_band_url = `/v2/band/posts?access_token=${access_token}&band_key=${band_key}&locale=en_kr`;
      axios.get(get_band_url).then((res) => {
        const band_data = res.data.result_data.items;
        this.setState({ band_data: band_data });

        // some은 순회하는도중 true일경우 종료
        band_data.some((item) => {
          const content = item.content.replace(/(?:\r\n|\r|\n)/g, "<br/>");
          if (content.lastIndexOf("식단표") > 0) {
            this.setState({ selectedCategoryItem: item });
            return true;
          }
        });
      });
      // 데이터 가져오기 종료
      this.setState({ lodding: false });
    };
    fetchData();
  }

  render() {
    const band_item = this.state.selectedCategoryItem;
    return (
      <div>
        {/* band_item이 null인 경우는 오류발생함 */}
        {band_item !== null ? <BandItem item={band_item} /> : "HELLO"}
      </div>
    );
  }
}

export default band;
