import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";
import { UserContext } from "../context/UserStore";
import BackgroundImg from "../images/rank.png";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Ti = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5em;
`;

const Background = styled.div`
  border: 1px black solid;
  background-image: url(${BackgroundImg});
  background-size: cover;
  background-position: center;
  flex: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
    <Ti>내 랭킹</Ti>
    <Container>
      <Background>
        <ul>
          <li>내 큰손 랭킹</li>
          <li>내 뱃지 랭킹</li>
        </ul>
      </Background>

    </Container>
    </>
  );
};

export default MyRanking;
