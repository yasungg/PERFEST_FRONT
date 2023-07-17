import axios from "axios";

const localHost = "http://localhost:8111";
const ReviewAPI = {
    // 리뷰 작성하기
    ReviewWrite: async(festivalId, reviewContent, memberId) => {
        const reviewInsert = {
        festivalId : festivalId,
        reviewContent : reviewContent,
        memberId : memberId
    }

    return await axios.post(localHost + `/auth/review/writereview`,reviewInsert);
},
    GetReview: async(festivalId) => {
        return await axios.get(localHost + `/auth/review/getreview?festivalId=${festivalId}`);
},
    GetReviewCount: async(festivalId) => {
        return await axios.get(localHost + `/auth/review/getreviewcount/festivalId=${festivalId}`);
}


}
export default ReviewAPI;