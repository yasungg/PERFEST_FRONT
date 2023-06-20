import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Profile from "../images/47802_35328_56.jpg";

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
    { name: "내정보 관리", path: "/MySetting" },
    { name: "내 리뷰 보기", path: "/MyReview" },
    { name: "예약 목록", path: "/myPayList" },
    { name: "주문 내역", path: "/Mylikedlist" },
    { name: "게시글 관리", path: "/Mywrite" },
    { name: "나의 랭킹", path: "/Myranking" }
  ];

  return (
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
            >
              {menu.name}
            </MenuLink>
          </MenuItem>
        ))}
      </Menu>
    </SideBarWrapper>
  );
};

export default SideBar;
