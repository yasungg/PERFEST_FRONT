import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

const RankingAPI = {
    GetRichRanking : async() => {
        return await axios.get(KH_DOMAIN + `/auth/richranking/getrichranking`)
    },
    GetBadgeRanking : async() => {
        return await axios.get(KH_DOMAIN + `/auth/badgeranking/getbadgeranking`)
    }

};
export default RankingAPI;