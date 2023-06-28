import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import { useState } from "react";
import CommentAPI from "../api/CommentAPI";
import { useEffect } from "react";
import BoardAPI from "../api/BoardAPI";
import { useParams } from "react-router";
import {formatDate} from "../components/DateStyle";
const Title = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 50px;
`;
const BoardInfo = styled.div`
`;
const BoardTitle = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;

`;
const UserInfo = styled.div`
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
const CommentDesc = styled.div`
display: flex;
flex-direction: column;
`;
const Comment = styled.div`
margin-top: 5px;
margin-bottom: 5px;
background-color: #D9D9D9;
`;
const CommentHead = styled.div`
display: flex;
justify-content: flex-start;
`;
const CommentNickName = styled.div`
`;
const CommentWrittenTime = styled.div`
font-size: 13px;
`;
const CommentReWrite = styled.div`
`;
const CommentLike = styled.div`
`;
const CommentBody = styled.div`
`;
const CommentLikeCount = styled.div`
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
    const {communityId} = useParams(); // 게시판 번호 전달 하기 위해서 useparams 사용
    const [inputComment, setInputComment] = useState("");
    const [commentCount, setCommentCount] = useState("");
    const [boardArticle, setBoardArticle] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [commentUpdateTrigger, setCommentUpdateTrigger] = useState(false); // 댓글 업데이트를 트리거하는 상태 추가

    const onChangeComment = (e) => {
        setInputComment(e.target.value);
    }
    // 게시판 댓글 작성
    const onClickWriteComment = async() => {
        const response = await CommentAPI.CommentWrite(inputComment, communityId);
        console.log(response.data);
        setCommentUpdateTrigger(prev => !prev);
        setInputComment(""); // 댓글 작성 후 inputComment 상태를 초기화하여 textarea의 내용을 지움
    }
    // 게시판에 있는 댓글 갯수 가져오기
    useEffect(() => {
    const getCommentCount = async() =>{
        const rsp = await CommentAPI.CommentGetCount(communityId);
        setCommentCount(rsp.data);
    }
    getCommentCount();
    },[commentUpdateTrigger])
    // 게시판 본문 가져오기
    useEffect(() => {
    const getBoardArticle = async() => {
        const response = await BoardAPI.GetBoardArticle(communityId);
        console.log(response.data);
        setBoardArticle(response.data);
    }
    getBoardArticle();
    },[communityId])
    // 게시판 공감하기 눌르면 공감하기 1 추가
    const onClickBoardLike = async() => {
        const response = await BoardAPI.AddBoardLike(communityId);
        console.log(response.data);
    }
    // 댓글 좋아요 눌르면 댓글 좋아요 1 추가
    const onClickCommentLike  = async(commentId) => {
        console.log(commentId);
        const response = await CommentAPI.AddCommentLike(commentId);
        console.log(response.data);
    }
    // 해당 게시판 댓글 가져오기
    useEffect(() => {
    const getBoardComment = async() => {
        const response = await CommentAPI.GetComment(communityId);
        console.log(response.data);
        setCommentData(response.data);
    }
    getBoardComment();
    },[commentUpdateTrigger])
    const getCategoryText = (category) => {
        switch (category) {
          case 'FIND_PARTY':
            return '파티원 찾기';
          case 'FREE_BOARD':
            return '자유게시판';
          case 'Q_A':
            return 'Q&A';
          default:
            return '';
        }
      };
    return(
        <Container justifyContent="center" alignItems="center">
            <BodyContainer>
            {boardArticle&&boardArticle.map((community) => (
                <BoardInfo key={community.communityTitle}>
                <Title><h1>{getCategoryText(community.communityCategory)}</h1></Title> 
                <BoardTitle><h2>{community.communityTitle}</h2></BoardTitle>
                <UserInfo>
                    <BoardNickname>{community.memberDTOs}</BoardNickname>
                    <BoardDate>{formatDate(community.writtenTime)}</BoardDate>
                </UserInfo>
                <BoardDesc>{community.communityDesc}</BoardDesc>
                </BoardInfo>
                ))}
                <CommentInfo>
                <CommentCount>댓글{commentCount}</CommentCount>
                </CommentInfo>
                <CommentWrite>
                    <textarea className="commentwrite"  cols="160" rows="3" value={inputComment} onChange={onChangeComment}></textarea>
                    <CommentWriteButton onClick={onClickWriteComment}>댓글 작성하기</CommentWriteButton>
                </CommentWrite>
                {commentData&&commentData.map((comment) => (
                <CommentDesc key={comment.commentBody}>
                    <Comment>
                    <CommentHead>
                        <CommentNickName></CommentNickName>
                        <CommentWrittenTime>{formatDate(comment.commentWrittenTime)}</CommentWrittenTime>
                        <CommentReWrite><button>대댓글</button></CommentReWrite>
                        <CommentLike><button onClick={() => onClickCommentLike(comment.commentId)}>좋아요</button></CommentLike>
                    </CommentHead>
                    <CommentBody>{comment.commentBody}</CommentBody>
                    <CommentLikeCount>{comment.commentLikeCount}</CommentLikeCount>
                    </Comment>
                </CommentDesc>
                ))}
                <BoardLike><button onClick={onClickBoardLike}>공감하기</button></BoardLike>
            </BodyContainer>
        </Container>
    );
};
export default BoardArticle;