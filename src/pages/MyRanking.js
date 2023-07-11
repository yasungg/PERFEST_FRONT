import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";
import { UserContext } from "../context/UserStore";
import BackgroundImg from "../images/—Pngtree—honor medal_6703325.png";

const BodyContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 300px;
  margin-top: 50px;
  background-image: url(${BackgroundImg});
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
`;

const RankingTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const RankingInfo = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const TrophyIcon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: gold;
  border-radius: 50%;
  margin-right: 5px;
`;

const MyRanking = () => {
  const [memberRichRanking, setMemberRichRanking] = useState(null);
  const [memberBadgeRanking, setMemberBadgeRanking] = useState(null);

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
            <TrophyIcon /> 뱃지 랭킹: {memberBadgeRanking}등
          </RankingInfo>
        ) : (
          <RankingInfo>뱃지 랭킹 정보 없음</RankingInfo>
        )}

        <RankingTitle>내 리치 랭킹</RankingTitle>
        {memberRichRanking ? (
          <RankingInfo>
            <TrophyIcon /> 큰손 랭킹: {memberRichRanking}등
          </RankingInfo>
        ) : (
          <RankingInfo>큰손 랭킹 정보 없음</RankingInfo>
        )}
      </Container>
    </BodyContainer>
  );
};

export default MyRanking;
