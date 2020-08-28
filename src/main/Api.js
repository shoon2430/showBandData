import axios from "axios";

export default async () => {
  let allBandPosts = [];

  //    네이버 밴드키 가져오기
  const access_token = process.env.REACT_APP_NAVER_BAND_KEY;
  const url = `/v2.1/bands?access_token=${access_token}`;
  const band_key = await axios
    .get(url)
    .then((res) => {
      return res.data.result_data.bands[0].band_key;
    })
    .catch(function (error) {
      console.log(error);
    });
  if (!band_key) return allBandPosts;

  //   네이버 밴드글 데이터 가져오기
  const get_band_url = `/v2/band/posts?access_token=${access_token}&band_key=${band_key}&locale=en_kr`;

  let get_next_band_url = "";
  let nextPage = null;

  while (true) {
    // 다음 페이지가 있을 경우 after파라미터 추가
    get_next_band_url =
      nextPage === null ? get_band_url : get_band_url + `&after=${nextPage}`;

    const result_data = await axios
      .get(get_next_band_url)
      .then((res) => {
        return res.data.result_data;
      })
      .catch(function (error) {
        console.log(error);
      });
    // 데이터를 못가져오는경우
    if (!result_data) break;

    allBandPosts = allBandPosts.concat(result_data.items);

    // 다음페이지가 없을 경우 종료
    if (result_data.paging.next_params === null) break;
    nextPage = result_data.paging.next_params.after;
  }

  return allBandPosts;
};
