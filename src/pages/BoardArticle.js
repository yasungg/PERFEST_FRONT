import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import { useState } from "react";
import CommentAPI from "../api/CommentAPI";
import { useEffect } from "react";
const Title = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 50px;
`;
const BoardTitle = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;

`;
const BoardInfo = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 20px;
background-color:  #D9D9D9;
width: 100%;
`;
const BoardNickname = styled.div`
`;
const BoardDate = styled.div`
`;
const BoardDesc = styled.div`
display: flex;
margin-top: 50px;
height: 200px;
width: 100%;
background-color:  #D9D9D9;
`;
const CommentInfo = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
`;
const CommentCount = styled.div`
`;
const CommentWrite = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
.commentwrite{
    width: 90%;
}
`;
const CommentWriteButton = styled.button`
width:7%;
&:hover{
    cursor: pointer;
}
`;
const BoardLike = styled.div`
display: flex;
width: 100%;
justify-content: center;
align-items: center;
`;
const BoardArticle = () => {
    const [inputComment, setInputComment] = useState("");
    const [commentCount, setCommentCount] = useState("");

    const onChangeComment = (e) => {
        setInputComment(e.target.value);
    }
    const onClickWriteComment = async() => {
        const response = await CommentAPI.CommentWrite(inputComment);
        console.log(response.data);
    }
    useEffect(() => {
    const getCommentCount = async() =>{
        const rsp = await CommentAPI.CommentGetCount();
        setCommentCount(rsp.data);
    }
    getCommentCount();
    },[])
    return(
        <Container justifyContent="center" alignItems="center">
            <BodyContainer>
                <Title><h1>자유 게시판</h1></Title>
                <BoardTitle>게시글 제목1</BoardTitle>
                <BoardInfo>
                    <BoardNickname>닉네임1</BoardNickname>
                    <BoardDate>2023.06.21</BoardDate>
                </BoardInfo>
                <BoardDesc>게시판 내용+사진</BoardDesc>
                <CommentInfo>
                <CommentCount>댓글{commentCount}</CommentCount>
                </CommentInfo>
                <CommentWrite>
                    <textarea className="commentwrite"  cols="160" rows="3" value={inputComment} onChange={onChangeComment}></textarea>
                    <CommentWriteButton onClick={onClickWriteComment}>댓글 작성하기</CommentWriteButton>
                </CommentWrite>
                <BoardLike><button>공감하기</button></BoardLike>
            </BodyContainer>
        </Container>
    );
};
export default BoardArticle;