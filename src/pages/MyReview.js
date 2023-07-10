import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";
import { UserContext } from "../context/UserStore";
import Modal from "../utils/Modal";

const BodyContainer = styled.div`
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ReviewContainer = styled.div`
  margin-bottom: 20px;
`;

const ReviewTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const ReviewWrittenTime = styled.p`
  font-size: 12px;
  color: #888;
  margin-bottom: 10px;
`;

const ReviewContent = styled.p`
  font-size: 14px;
`;

const DeleteReview = styled.div`
  width: 80%;
  margin: 30px auto;

  button {
    width: 100%;
    height: 35px;
    font-size: 0.8em;
    font-weight: bold;
    background-color: #2f4050;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
      background-color: skyblue;
    }
  }

  hr {
    background-color: lightgray;
    border: 0.3px solid lightgray;
  }
`;

const MyReview = () => {
  const [memberReview, setMemberReview] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  // const context = UserContext(UserContext);
  // const { memberId } = context; // 로그인후 컨텍스트로 받아올예정
  let memberId = 1;

  useEffect(() => {
    const fetchMemberReview = async () => {
      const rsp = await MemberAPI.getReview(memberId);
      if (rsp.status === 200) setMemberReview(rsp.data);
    };
    fetchMemberReview();
  }, [memberId]);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const deleteMyReview = (reviewId) => {
    setDeleteModalOpen(true);
    setReviewToDelete(reviewId);
  };

  const confirm = async (modalType) => {
    if (modalType === "deleteReview") {
      const response = await MemberAPI.delReview(memberId);
      console.log(response.data);

      const updatedReviewList = memberReview.filter(
        (review) => review.id !== reviewToDelete
      );
      setMemberReview(updatedReviewList);
    }

    setDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  const closeModal = () => {
    setDeleteModalOpen(false);
    setReviewToDelete(null);
  };

  return (
    <BodyContainer>
      <p>내 리뷰</p>
      <Container>
        {memberReview && memberReview.map((review) => (
          <ReviewContainer key={review.reviewId}>
            <ReviewTitle>{review.reviewTitle}</ReviewTitle>
            <ReviewWrittenTime>{formatTime(review.reviewWrittenTime)}</ReviewWrittenTime>
            <ReviewContent>{review.reviewContent}</ReviewContent>
            <DeleteReview>
              <button onClick={() => deleteMyReview(review.id)}>리뷰 삭제</button>
            </DeleteReview>
          </ReviewContainer>
        ))}
      </Container>

      <Modal
        open={deleteModalOpen}
        type={true}
        close={closeModal}
        confirm={() => confirm("deleteReview")}
        header="리뷰삭제"
      >
        정말 삭제하시겠습니까?
      </Modal>
    </BodyContainer>
  );
};

export default MyReview;
