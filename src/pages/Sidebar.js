import React, { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
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
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const Nickname = styled.span`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 10px;
`;

const MenuLink = styled(NavLink)`
  color: #555;
  font-size: 16px;
  text-decoration: none;

  &.active {
    color: #333;
    font-weight: bold;
  }
`;

const SideBar = () => {
  const memberNickname = "잼뮈"; // 회원닉 가져올 예정

  const menus = [
    { name: "내정보 관리", path: "/MySetting", component: MySetting },
    { name: "내 리뷰 보기", path: "/MyReview", component: MyReview },
    { name: "예약 목록", path: "/MyReserveList", component: MyReserveList },
    { name: "주문 내역", path: "/MyPaylist", component: MyPayList },
    { name: "게시글 관리", path: "/MyWrite", component: MyWrite },
    { name: "나의 랭킹", path: "/MyRanking", component: MyRanking }
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
                exact
                to={menu.path}
                activeClassName="active"
                onClick={() => handleMenuClick(menu.path)}
              >
                {menu.name}
              </MenuLink>
            </MenuItem>
          ))}
        </Menu>
      </SideBarWrapper>

      <div>
        {selectedMenu === "/MySetting" && <MySetting />}
        {selectedMenu === "/MyReview" && <MyReview />}
        {selectedMenu === "/MyReserveList" && <MyReserveList />}
        {selectedMenu === "/MyPayList" && <MyPayList/>}
        {selectedMenu === "/MyWrite" && <MyWrite/>}
        {selectedMenu === "/MyRanking" && <MyRanking/>}
        </div>
        </Container>
  );
};

export default SideBar;

