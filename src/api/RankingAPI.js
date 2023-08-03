import axios from "axios";
const localhost = "http://localhost:8111"
const RankingAPI = {
    GetRichRanking : async() => {
        return await axios.get(localhost + `/auth/richranking/getrichranking`)
    },
    GetBadgeRanking : async() => {
        return await axios.get(localhost + `/auth/badgeranking/getbadgeranking`)
    }

};
export default RankingAPI;