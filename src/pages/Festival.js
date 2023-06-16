import React from "react";
import styled from "styled-components";
import { Container } from "react-dom";
import Header from "../components/Header";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

const Festival = () => {

    return(
        <>
        <Container>
            <div className="container">
                <div className="TopMenu"></div>
                <div className="Search"></div>
            </div>
        </Container>
        </>
    );
};
export default Festival;