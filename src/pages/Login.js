import { Container } from "../components/StandardStyles";
import styled from "styled-components";
import kakaoButton from "../images/kakaoButton.png";

const KakaoBtn = styled.button`
  border: none;
  background: none;
`;
const Login = () => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:8111/koauth/login/kakao";
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
  return (
    <Container justifyContent="center" alignItems="center">
      <KakaoBtn className="kakakoBtn">
        <a href={KAKAO_AUTH_URI}>
          <img src={kakaoButton} alt="" />
        </a>
      </KakaoBtn>
    </Container>
  );
};
export default Login;
