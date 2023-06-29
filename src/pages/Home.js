import { Container, BodyContainer } from "../components/StandardStyles";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useLocation } from "react-router";

const Home = () => {
  const location = useLocation();
  const getJWT = new URLSearchParams(location.search);
  console.log(getJWT.get("jwt"));

  useState(() => {
    const accessToken = JSON.parse(getJWT.get("jwt"));
    console.log(accessToken);
    localStorage.setItem("grantType", accessToken.accessToken);
    localStorage.setItem("accessToken", accessToken.accessToken);
    localStorage.setItem("refreshToken", accessToken.refreshToken);
    localStorage.setItem("tokenExpiresIn", accessToken.tokenExpiresIn);
    localStorage.setItem(
      "refreshTokenExpiresIn",
      accessToken.refreshTokenExpiresIn
    );
    console.log(localStorage.getItem("accessToken"));
  }, [getJWT]);

  return (
    <Container alignItems="center">
      <Header />
      <BodyContainer>aa</BodyContainer>
    </Container>
  );
};
export default Home;
