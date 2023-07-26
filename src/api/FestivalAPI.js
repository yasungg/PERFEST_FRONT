import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const FestivalAPI = {

  // 페이지 렌더링 될 때 DB에 축제 정보 저장
  saveFestivalInfo: async() => {
    return await axios.get(KH_DOMAIN + '/auth/festival/savefestivals') ;
  },

  // 전체 축제 조회
  getFestivalInfo: async() => {
    return await axios.get(KH_DOMAIN + '/auth/festival/getAllFestivals')
  },

  // 카테고리 검색 
  searchLocationFestival: async(info) => {
    return await axios.post(KH_DOMAIN + `/auth/festival/getSearchFestivalInfo `, info)
  }
}
export default FestivalAPI;