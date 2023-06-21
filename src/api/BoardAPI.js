import axios from "axios";

const localHost = "http://localhost:8111";
const BoardAPI = {
     // 게시판 전체조회
    BoardGet: async() => {
        return await axios.get(localHost + `/community/getallboard`);
    },
    // 게시판 작성
    BoardWrite : async(title, category, text ) => {
        const writeBoard = {
        communityTitle : title,
        communityCategory : category,
        communityDesc : text
        };
        return await axios.post(localHost + `/community/writeboard`, writeBoard);
    },
    // 게시판 수정
    BoardUpdate : async(title, category, text ) => {
        const updateBoard = {
        communityTitle : title,
        communityCategory : category,
        communityDesc : text
        };
        return await axios.post(localHost + `/community/updateboard`, updateBoard);
    },
   
};
export default BoardAPI;