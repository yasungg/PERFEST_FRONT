import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
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
margin-top: 50px;
`;
const Text = styled.div`
height: 50px;
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
const Board = () => {
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
            <BoardText>
                <Text>게시판 제목</Text>
                <Text>게시판 제목</Text>
                <Text>게시판 제목</Text>
                <Text>게시판 제목</Text>
                <Text>게시판 제목</Text>
            </BoardText>
            <WriteButton>글쓰기</WriteButton>
        </BodyContainer>
        </Container>
    );
};
export default Board;