import axios from "axios";

const localHost = "http://localhost:8111";
const BoardAPI = {
     // 게시판 전체조회
    BoardGet: async() => {
        return await axios.get(localHost + `/community/getallboard`);
    },
    // 게시판 카테고리별 조회
    BoardGetByCategory: async(selectCategory) => {
        return await axios.get(localHost + `/community/getselectboard?communityCategory=${selectCategory}`)
    },
    // 게시판 최신순 조회
    BoardGetByNewest: async() => {
        return await axios.get(localHost + `/community/getnewestboard`)
    },
    // 게시판 본문 내용 가져오기
    GetBoardArticle: async(communityId) => {
        return await axios.get(localHost + `/community/getboardarticle?communityId=${communityId}`)
    },
    // 게시판 게시글에 좋아요 추가
    AddLike: async(communityId) => {
        const addLike = {
            communityId : communityId
        };
        return await axios.post(localHost + `/community/BoardArticle/${communityId}/addlike`, addLike);
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