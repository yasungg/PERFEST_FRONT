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

const ReservationContainer = styled.div`
  margin-bottom: 20px;
`;

const ActivityName = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

const ActivityDescription = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
`;

const ActivityDate = styled.p`
  font-size: 14px;
`;

const MyReserveList = () => {
  // const context = UserContext(UserContext);
  // const { memberId } = context; // 로그인후 컨텍스트담아올예정
  let memberId = 1;

  const [memberReserve, setMemberReserve] = useState([]);

  useEffect(() => {
    const fetchMemberReservation = async () => {
      const rsp = await MemberAPI.getReservation(memberId);
      if (rsp.status === 200) setMemberReserve(rsp.data);
    };
    fetchMemberReservation();
  }, [memberId]);

  return (
    <BodyContainer>
      <Container>
        {memberReserve && memberReserve.map((reservation) => (
          <ReservationContainer key={reservation.activityName}>
            <ActivityName>{reservation.activityName}</ActivityName>
            <ActivityDescription>{reservation.activityDesc}</ActivityDescription>
            <ActivityDate>
              {new Date(reservation.startDate).toLocaleDateString()} - {"  "}
              {new Date(reservation.endDate).toLocaleDateString()}
            </ActivityDate>
          </ReservationContainer>
        ))}
      </Container>
    </BodyContainer>
  );
};

export default MyReserveList;
