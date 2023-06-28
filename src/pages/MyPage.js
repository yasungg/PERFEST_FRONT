import React, { useState } from "react";
import styled from "styled-components";
import Profile from "../images/47802_35328_56.jpg";
import MySetting from "./MySetting";
import MyReview from "./MyReview";
import MyReserveList from "./MyReserveList";
import MyPayList from "./MyPayList";
import MyWrite from "./MyWrite";
import MyRanking from "./MyRanking";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  
`;

const SideBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 300px;
  background-color: #2f4050;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Nickname = styled.span`
  color: white;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Menu = styled.div`
  padding: 0;
`;

const MenuItem = styled.div`
  width: 100%;
  height: 50px;
  list-style-type: none;
  margin: 0;
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;

  &:hover {
    background-color: #293846;
  }

  &.active {
    background-color: #293846;
  }
`;

const MenuLink = styled.div`
  color: white;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
`;

const MyPage = () => {
  const memberNickname = "잼뮈"; // 회원닉 가져올 예정

  const menus = [
    { name: "내 정보", path: "/MySetting" },
    { name: "내 리뷰", path: "/MyReview" },
    { name: "예약 목록", path: "/MyReserveList" },
    { name: "주문 내역", path: "/MyPayList" },
    { name: "내 게시글", path: "/MyWrite" },
    { name: "내 랭킹", path: "/MyRanking" }
  ];

  const [selectedMenu, setSelectedMenu] = useState("");

  const handleMenuClick = (path) => {
    setSelectedMenu(path);
  };

  return (
    <Container>
      <SideBarWrapper>
        <ProfileImage src={Profile} alt="Profile" />
        <Nickname>{memberNickname} 님</Nickname>
        <Menu>
          {menus.map((menu, index) => (
            <MenuItem key={index}>
              <MenuLink
                className={selectedMenu === menu.path ? "active" : ""}
                onClick={() => handleMenuClick(menu.path)}
              >
                {menu.name}
              </MenuLink>
            </MenuItem>
          ))}
        </Menu>
      </SideBarWrapper>
      <ContentWrapper>
        {selectedMenu === "/MySetting" && <MySetting />}
        {selectedMenu === "/MyReview" && <MyReview />}
        {selectedMenu === "/MyReserveList" && <MyReserveList />}
        {selectedMenu === "/MyPayList" && <MyPayList />}
        {selectedMenu === "/MyWrite" && <MyWrite />}
        {selectedMenu === "/MyRanking" && <MyRanking />}
      </ContentWrapper>
    </Container>
  );
};

export default MyPage;
