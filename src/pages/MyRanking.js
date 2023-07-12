import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";
import { UserContext } from "../context/UserStore";
import BackgroundImg from "../images/rank.png";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
`;

const Background = styled.div`
  height: 500px;
  width: 500px;
  border: none;
  background-image: url(${BackgroundImg});
  background-size: cover;
  background-position: center;
`;



const MyRanking = () => {
  const [memberRichRanking, setMemberRichRanking] = useState(null);
  const [memberBadgeRanking, setMemberBadgeRanking] = useState(null);

  // context 로 가져올 예정
  let memberId = 1;

  useEffect(() => {
    const fetchMemberRichRanking = async () => {
      const rsp = await MemberAPI.myRichRanking(memberId);
      if (rsp.status === 200) setMemberRichRanking(rsp.data);
    };
    fetchMemberRichRanking();
  }, [memberId]);

  useEffect(() => {
    const fetchMemberBadgeRanking = async () => {
      const rsp = await MemberAPI.myBadgeRanking(memberId);
      if (rsp.status === 200) setMemberBadgeRanking(rsp.data);
    };
    fetchMemberBadgeRanking();
  }, [memberId]);

  return (
    <>
    <Container>
      <p>내 랭킹</p>
      <Background>왜</Background>

    </Container>
    </>
  );
};

export default MyRanking;
