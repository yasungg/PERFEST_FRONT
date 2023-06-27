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
`;

const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 20px;
  width: 240px;
  margin-right: 20px;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Nickname = styled.span`
  color: #333;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Menu = styled.div`
  padding: 0;
`;

const MenuItem = styled.div`
  margin-bottom: 30px;
`;

const MenuLink = styled.div`
  color: #555;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  margin: 0 auto;
  line-height: 1.5;

  &.active {
    color: #333;
    font-weight: bold;
  }
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
