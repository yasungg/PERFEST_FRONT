import React from "react";
import BackgroundImg from "../images/—Pngtree—honor medal_6703325.png";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";

const Container = styled.div`
    display: flex;
    justify-content: center;
    background-image: url(${BackgroundImg});
    /* 추가적인 스타일 설정 */
`;

const MyComment = () => {
    return (
        <Container>
            {/* 내용 추가 */}<p>왜안되냐고</p>
        </Container>
    );
}

export default MyComment;
