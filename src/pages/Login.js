import React, { useState, useEffect } from "react";
import styled from "styled-components";
import kakaoButton from "../images/kakaoButton.png";
import loginBackgroundImg from "../images/loginboxbackground.jpg";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
  overflow: scroll;
`;
const Box = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 464px;
  height: 600px;
  border-radius: 5px;
  background-image: url(${loginBackgroundImg});
  background-size: cover;
  border: none;
  box-shadow: 5px 20px 50px black;
  overflow: hidden;
`;
const SignUpBox = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
  align-items: center;
  width: 464px;
  height: 600px;
  border-radius: 5px;
  border: none;
`;
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 464px;
  height: 1000px;
  border-radius: 60% / 10%;
  background: white;
  border: none;
  z-index: 9;
  transform: translateY(${(props) => props.transForm});
  transition: 0.3s ease-in-out;
`;

const LogoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  align-items: center;
  width: 100%;
  height: ${(props) => props.height};
  border: none;
  border-radius: 5px;
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 32px;
  margin-top: ${(props) => props.marginTop};
  border-radius: 5px;
  border: none;
  font-size: ${(props) => props.scale};
  color: ${(props) => props.color};
  font-weight: bold;
  transform: translateY(${(props) => props.Ylocation});
  transition: 0.3s ease-in-out;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;
const SignUpLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 10px 30px black;
  width: 300px;
  height: 32px;
  margin-top: ${(props) => props.marginTop};
  border-radius: 5px;
  border: none;
  font-size: ${(props) => props.scale};
  color: ${(props) => props.color};
  font-weight: bold;
  transform: translateY(${(props) => props.Ylocation});
  transition: 0.3s ease-in-out;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;
const InputBoxContainer = styled.div`
  display: flex;
  flex-flow: column;
  width: 320px;
  height: ${(props) => props.height};
  @media screen and (max-width: 320px) {
    width: 100%;
  }
`;
const LoginInputBox = styled.input`
  box-sizing: border-box;
  width: 320px;
  height: ${(props) => props.height};
  background: #ddd;
  border-radius: 5px;
  border: none;
  background: #ddd;
  font-size: 16px;
  padding-left: 8px;
  &:focus {
    outline: none;
  }
`;
const SignUpInputBox = styled.input`
  box-sizing: border-box;
  width: 320px;
  height: ${(props) => props.height};
  background-color: white;
  box-shadow: 5px 10px 20px black;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  padding-left: 8px;
  &:focus {
    outline: none;
  }
`;
const RegexResult = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 16px;
  .regex {
    display: none;
    font-size: 14px;
    color: ${(props) => props.fontColor};
    margin: 0 8px 0 0;
    padding: 0;
  }
`;
const AdditionalBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 100px;
  div {
    width: 200px;
    height: 16px;
    font-size: 14px;
  }
`;
const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 45px;
  margin: 16px 0 8px 0;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
  &:active {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
`;
const SignUpBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 10px 20px black;
  width: 300px;
  height: 45px;
  margin: 16px 0 8px 0;
  border: none;
  border-radius: 5px;
  color: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
  font-weight: bold;
  background: white;
  transition: 0.3s ease-in-out;
  &:active {
    outline: none;
  }
  &:hover {
    cursor: pointer;
    background: #302b63;
    color: white;
  }
`;
const KakaoBtn = styled.button`
  border: none;
  background: none;
  &:hover {
    cursor: pointer;
  }
`;

const Login = () => {
  const REST_API_KEY = "86c9013e77a6aad5b8b2c49eddca45b7";
  const REDIRECT_URI = "http://localhost:8111/koauth/login/kakao";
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
  const [loginBoxTransformY, setLoginBoxTransformY] = useState("100px");
  const [loginLogoSize, setLoginLogoSize] = useState("24px");
  const [logoYLocation, setLogoYLocation] = useState("0");
  const [signUpLogoSize, setSignUpLogoSize] = useState("64px");
  const [signUpLogoYLocation, setSignUpLogoYLocation] = useState("0px");
  const changeLoginForm = () => {
    setLoginBoxTransformY("-350px");
    setLoginLogoSize("64px");
    setLogoYLocation("64px");
    setSignUpLogoYLocation("-48px");
    setSignUpLogoSize("24px");
  };
  const changeSignUpForm = () => {
    setLoginBoxTransformY("100px");
    setLoginLogoSize("24px");
    setLogoYLocation("0px");
    setSignUpLogoYLocation("0");
    setSignUpLogoSize("64px");
  };
  return (
    <Container justifyContent="center" alignItems="center">
      <Box>
        <SignUpBox>
          <LogoBox height="192px" justifyContent="center">
            <SignUpLogo
              onClick={changeSignUpForm}
              scale={signUpLogoSize}
              Ylocation={signUpLogoYLocation}
              color="white"
            >
              Sign up
            </SignUpLogo>
          </LogoBox>
          <InputBoxContainer height="184px">
            <SignUpInputBox
              type="email"
              name="signUpMail"
              placeholder="이메일을 입력하세요."
              height="32px"
            />
            <RegexResult fontColor="red">
              <span className="regex">aa</span>
            </RegexResult>
            <SignUpInputBox
              type="password"
              name="signUpPassword"
              placeholder="비밀번호를 입력하세요."
              height="32px"
            />
            <RegexResult fontColor="red">
              <span className="regex">aa</span>
            </RegexResult>
            <SignUpInputBox
              type="text"
              name="name"
              placeholder="이름을 입력하세요."
              height="32px"
            />
            <RegexResult />
            <SignUpInputBox
              type="text"
              name="nickname"
              placeholder="닉네임을 입력하세요."
              height="32px"
            />
            <RegexResult fontColor="red">
              <span className="regex">aa</span>
            </RegexResult>
          </InputBoxContainer>
          <SignUpBtn>Sign up</SignUpBtn>
        </SignUpBox>
        <LoginBox transForm={loginBoxTransformY}>
          <LogoBox height="192px" justifyContent="flex-start">
            <Logo
              marginTop="8px"
              onClick={changeLoginForm}
              scale={loginLogoSize}
              Ylocation={logoYLocation}
              color="#302b63"
            >
              Log in
            </Logo>
          </LogoBox>
          <InputBoxContainer height="128px">
            <LoginInputBox
              type="email"
              name="mail"
              placeholder="이메일을 입력하세요."
              height="32px"
            />
            <RegexResult fontColor="red">
              <span className="regex">aa</span>
            </RegexResult>
            <LoginInputBox
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요."
              height="32px"
            />
            <RegexResult fontColor="red">
              <span className="regex">aa</span>
            </RegexResult>
          </InputBoxContainer>
          <LoginBtn>
            <span>로그인</span>
          </LoginBtn>
          <KakaoBtn>
            <a href={KAKAO_AUTH_URI}>
              <img src={kakaoButton} alt="" />
            </a>
          </KakaoBtn>
          <AdditionalBox />
        </LoginBox>
      </Box>
    </Container>
  );
};
export default Login;
