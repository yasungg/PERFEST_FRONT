import React from "react";
import styled from "styled-components";
import SideBar from "./Sidebar";
import MyPage from "./MyPage";

const Container = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
`;

const MainPage = () => {
  return (
    <Container>
      <SideBar />
      <MainContent>
        <MyPage />
      </MainContent>
    </Container>
  );
};

export default MainPage;
