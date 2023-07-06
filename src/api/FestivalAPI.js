import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const FestivalAPI = {
  // 전체 축제 조회
  getFestivalInfo: async() => {
    return await axios.get(KH_DOMAIN + '/auth/festival/getfestivals') ;
  }
}
export default FestivalAPI;