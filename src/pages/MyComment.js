import React from "react";
import BackgroundImg from "../images/—Pngtree—honor medal_6703325.png";
import styled from "styled-components";
import MemberAPI from "../api/MemberAPI";

const Container = styled.div`
    display: flex;
    justify-content: center;
    background-image: url(${BackgroundImg});
    background-size: cover; /* 이미지를 컨테이너에 맞게 조정 */
    background-repeat: no-repeat; /* 이미지 반복 없음 */
`;

const MyComment = () => {
    return (
        <Container>
            {/* 내용 추가 */}
        </Container>
    );
}

export default MyComment;
