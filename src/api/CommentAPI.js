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
    CommentGetCount : async() => {
        return await axios.get(localHost + `/comment/commentcount`)
    }
}
export default CommentAPI;