import styled from "styled-components";
import { Container } from "../components/StandardStyles";
import ReviewAPI from "../api/ReviewAPI";
import { useState } from "react";
import { useEffect } from "react";

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewWriting = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  textarea.reviewwrite {
    width: 85%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    resize: none;
    outline: none;
  }
`;

const ReviewWriteButton = styled.button`
  width: 15%;
  padding: 8px;
  margin-left: 20px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;
const Review = () => {
    const [inputReviewText, setInputReviewText] = useState("");
    const [reviewData, setReviewData] = useState([]);
    const [reviewUpdateTrigger, setReviewUpdateTrigger] = useState(false); // 리뷰 업데이트를 트리거하는 상태 추가
    const onChangeReview = (e) => {
      setInputReviewText(e.target.value);
    }
    // 리뷰 작성
    const onClickWriteReview = async() => {
        const festivalId = 1;
        const memberId = 1;
        const response = await ReviewAPI.ReviewWrite(festivalId, inputReviewText, memberId);
        console.log(response.data);
        setReviewUpdateTrigger(prev => !prev);
        setInputReviewText("");
    }
    // 해당 축제의 리뷰 가져오기
    useEffect(() => {
    const getFestivalReview = async() => {
        const festivalId = 1;
        const response = await ReviewAPI.GetReview(festivalId);
        console.log(response.data);
        setReviewData(response.data);
        console.log(reviewData);

    }
    getFestivalReview();
    },[reviewUpdateTrigger]);
    return(
        <Container justifyContent="center" alignItems="center">
          <ReviewContainer>
            <ReviewWriting>
            <textarea className="reviewwrite"  cols="160" rows="3" value={inputReviewText} onChange={onChangeReview}></textarea>
            <ReviewWriteButton onClick={onClickWriteReview}>리뷰 작성하기</ReviewWriteButton>
        </ReviewWriting>
        </ReviewContainer>
        </Container>
    )
}
export default Review;