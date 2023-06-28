import axios from "axios";

const localHost = "http://localhost:8111";
const CommentAPI = {
    CommentWrite : async(commentBody, communityId) => {
        const writeComment = {
            commentBody: commentBody,
            communityId: communityId
        };
        return await axios.post(localHost + `/comment/writecomment`, writeComment);
    },
    CommentGetCount : async(communityId) => {
        return await axios.get(localHost + `/comment/commentcount?communityId=${communityId}`)
    },
    GetComment : async(communityId) => {
        return await axios.get(localHost + `/comment/getcomment?communityId=${communityId}`)
    }
}
export default CommentAPI;