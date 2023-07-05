import React from "react";
import styled from "styled-components";
import { Container } from "../components/StandardStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FestivalAPI from "../api/FestivalAPI";


const BodyContainer = styled.div`
`

const FestivalDetail = () => {

  return (
    <Container>
      <Header />
      <BodyContainer>
      </BodyContainer>

      <Footer />
    </Container>
  );
};
export default FestivalDetail