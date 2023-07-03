import axios from "axios";

const localHost = "http://localhost:8111";
const CommentAPI = {
    // 댓글 작성하기
    CommentWrite : async(commentBody, communityId, memberId) => {
        const writeComment = {
            commentBody: commentBody,
            communityId: communityId,
            memberId: memberId
        };
        return await axios.post(localHost + `/comment/writecomment`, writeComment);
    },
    // 댓글 갯수 가져오기
    CommentGetCount : async(communityId) => {
        return await axios.get(localHost + `/comment/commentcount?communityId=${communityId}`)
    },
    // 댓글 가져 오기
    GetComment : async(communityId) => {
        return await axios.get(localHost + `/comment/getcomment?communityId=${communityId}`)
    },
    // 댓글 좋아요 추가
    AddCommentLike: async(commentId) => {
        const addLike = {
            commentId : commentId
        };
        return await axios.post(localHost + `/comment/addcommentlike`, addLike)
    },
}
export default CommentAPI;