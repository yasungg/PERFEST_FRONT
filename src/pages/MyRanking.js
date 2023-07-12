import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";
import { UserContext } from "../context/UserStore";
import BackgroundImg from "../images/—Pngtree—honor medal_6703325.png";

const BodyContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-image: url(${BackgroundImg});
  background-color: #ebebeb;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RankingTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const RankingInfo = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const TrophyIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: gold;
  border-radius: 50%;
  margin-right: 10px;
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
    <BodyContainer>
      <Container>
        <RankingTitle>내 뱃지 랭킹</RankingTitle>
        {memberBadgeRanking ? (
          <RankingInfo>
            <TrophyIcon />
            뱃지 랭킹: {memberBadgeRanking}등
          </RankingInfo>
        ) : (
          <RankingInfo>뱃지 랭킹 정보 없음</RankingInfo>
        )}

        <RankingTitle>내 리치 랭킹</RankingTitle>
        {memberRichRanking ? (
          <RankingInfo>
            <TrophyIcon />
            큰손 랭킹: {memberRichRanking}등
          </RankingInfo>
        ) : (
          <RankingInfo>큰손 랭킹 정보 없음</RankingInfo>
        )}
      </Container>
    </BodyContainer>
  );
};

export default MyRanking;
