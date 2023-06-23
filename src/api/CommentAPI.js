import axios from "axios";

const localHost = "http://localhost:8111";
const CommentAPI = {
    CommentWrite : async(commentBody) => {
        const writeComment = {
            commentBody: commentBody
        };
        return await axios.post(localHost + `/comment/writecomment`, writeComment);
    },
    CommentGetCount : async() => {
        return await axios.get(localHost + `/comment/commentcount`)
    }
}
export default CommentAPI;