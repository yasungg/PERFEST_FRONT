import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";
import { UserContext } from "../context/UserStore";

const BodyContainer = styled.div`
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const RankingTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const RankingInfo = styled.p`
  font-size: 14px;
`;

const MyRanking = () => {
  const [memberRichRanking, setMemberRichRanking] = useState(null);
  const [memberBadgeRanking, setMemberBadgeRanking] = useState(null);

  // const context = UserContext(UserContext);
  // const { memberId } = context;
  let memberId = 1;

  // 금액 많이쓴 리치랭킹 등수 조회
  useEffect(() => {
    const fetchMemberRichRanking = async () => {
      const rsp = await MemberAPI.myRichRanking(memberId);
      if (rsp.status === 200) setMemberRichRanking(rsp.data);
    };
    fetchMemberRichRanking();
  }, [memberId]);

  // 뱃지 갯수순 뱃지랭킹 등수 조회
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
        {memberBadgeRanking && memberBadgeRanking ? (
          <RankingInfo>뱃지 랭킹: {memberBadgeRanking}등</RankingInfo>
        ) : (
          <RankingInfo>뱃지 랭킹 정보 없음</RankingInfo>
        )}

        <RankingTitle>내 리치 랭킹</RankingTitle>
        {memberRichRanking && memberRichRanking ? (
          <RankingInfo>큰손 랭킹: {memberRichRanking}등</RankingInfo>
        ) : (
          <RankingInfo>큰손 랭킹 정보 없음</RankingInfo>
        )}
      </Container>
    </BodyContainer>
  );
};

export default MyRanking;
