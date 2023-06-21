import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import BoardAPI from "../api/BoardAPI";
import { useState } from "react";
import { useEffect } from "react";
const Title = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 50px;
`;
const Category = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
background-color:  #D9D9D9;
width: 100%;
align-items: center;
height: 70px;
`;
const CatButton = styled.button`
border: none;
font-size: 24px;
background-color: #D9D9D9;
&:hover{
    cursor: pointer;
}

`;
const Arrange = styled.div` // 정렬 방법 선택 div(최신순, 인기순)
display: flex;
justify-content: flex-end;
align-items: center;
`;
const ArrButton = styled.div`
margin-left: 5px;
margin-right: 5px;
`;
const BoardText = styled.div`
margin-top: 5px;
margin-bottom: 5px;
width: 100%;
`;
const BoardContents = styled.div`
display: flex;
height: 50px;
width: 100%;
margin-top: 7px;
margin-bottom: 7px;
background-color:  #D9D9D9;
border: 1px solid  #D9D9D9;
`
const WriteButton = styled.button`
display:flex;
justify-content: flex-end;
background-color: white;
border-style: none;
margin-top: 20px;
font-size: 22px;
&:hover{
    cursor: pointer;
}
`;
const BCategory = styled.div`
display:flex;
justify-content: center;
align-items: center;
width: 10%;
background-color: red;
`;
const BTitle = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 40%;
background-color: blue;
`;
const BTime = styled.div`
display: flex;
justify-content: center;
align-items: center;
background-color: yellow;
width: 50%;
`;
const Board = () => {
    const [BoardInfo, setBoardInfo] = useState("");
    useEffect(() => {
    const BoardGetAll = async() =>{
        const rsp = await BoardAPI.BoardGet();
        if(rsp.status === 200) setBoardInfo(rsp.data);
        console.log(rsp.data);
    };
    BoardGetAll();
},[]);
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
            <Title><h1>커뮤니티</h1></Title>
            <Category>
                <CatButton>전체</CatButton>
                <CatButton>자유게시판</CatButton>
                <CatButton>Q&A</CatButton>
                <CatButton>파티원 찾기</CatButton>
            </Category>
            <Arrange>
                <ArrButton>
                <input type="radio" name="arrange" id="newest" />
                <label for="newest">최신순</label>
                </ArrButton>
                <ArrButton>
                <input type="radio" name="arrange" id="likest" />
                <label for="likest">인기순</label>
                </ArrButton>
            </Arrange>
            {BoardInfo&&BoardInfo.map((community) => (
            <BoardText key={community.communityTitle}>
                <BoardContents>
                    <BCategory>{getCategoryText(community.communityCategory)}</BCategory> 
                    <BTitle>{community.communityTitle}</BTitle>
                    <BTime>{community.writtenTime}</BTime>
                    </BoardContents>
            </BoardText>
            ))}
            <WriteButton>글쓰기</WriteButton>
        </BodyContainer>
        </Container>
    );
};
export default Board;