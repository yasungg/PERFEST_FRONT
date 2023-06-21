import axios from "axios";

const localHost = "http://localhost:8111";
const BoardAPI = {
    BoardWrite : async(title, category, text ) => {
        const writeBoard = {
        communityTitle : title,
        communityCategory : category,
        communityDesc : text
        };
        return await axios.post(localHost + `/community/writeboard`, writeBoard);
    }
    
};
export default BoardAPI;