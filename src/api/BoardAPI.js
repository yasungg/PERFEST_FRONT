import axios from "axios";

const localHost = "http://localhost:8111";
const BoardAPI = {
     // 게시판 전체조회
    BoardGet: async() => {
        return await axios.get(localHost + `/auth/community/getallboard`);
    },
    // 게시판 카테고리별 조회
    BoardGetByCategory: async(selectCategory) => {
        return await axios.get(localHost + `/auth/community/getselectboard?communityCategory=${selectCategory}`)
    },
    // 게시판 최신순 조회
    BoardGetByNewest: async() => {
        return await axios.get(localHost + `/auth/community/getnewestboard`)
    },
    // 게시판 본문 내용 가져오기
    GetBoardArticle: async(communityId) => {
        return await axios.get(localHost + `/auth/community/getboardarticle?communityId=${communityId}`)
    },
    // 게시판 게시글에 좋아요 추가
    AddBoardLike: async(communityId) => {
        const addLike = {
            communityId : communityId
        };
        return await axios.post(localHost + `/auth/community/BoardArticle/${communityId}/addlike`, addLike);
    },
    // 게시판 작성
    BoardWrite : async(title, category, text, memberId ) => {
        const writeBoard = {
        communityTitle : title,
        communityCategory : category,
        communityDesc : text,
        memberId :memberId
        };
        return await axios.post(localHost + `/auth/community/writeboard`, writeBoard);
    },
    // 게시판 수정
    BoardUpdate : async(title, category, text ) => {
        const updateBoard = {
        communityTitle : title,
        communityCategory : category,
        communityDesc : text
        };
        return await axios.post(localHost + `/auth/community/updateboard`, updateBoard);
    },

   
};
export default BoardAPI;