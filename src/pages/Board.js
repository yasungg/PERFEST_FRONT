import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import BoardAPI from "../api/BoardAPI";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../components/DateStyle";
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
height: 100%;
background-color: ${({ isActive }) => (isActive ? "purple" : "#D9D9D9")};
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
height: 100%;
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
`;
const BTitle = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 40%;
`;
const BTime = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 50%;
`;
const Board = () => {
    const navigate = useNavigate();
    const [selectedBoardInfo, setSelectedBoardInfo] = useState([]);
    const [selectCategory, setSelectCategory] = useState("");
    const [activeButton, setActiveButton] = useState(""); // 버튼의 활성화 여부를 저장하는 상태

  
    // 게시판 전체 글 목록 가져오기
    const BoardGetAll = async () => {
        const rsp = await BoardAPI.BoardGet();
        if (rsp.status === 200) setSelectedBoardInfo(rsp.data);
        console.log(rsp.data);
      };
    
      useEffect(() => {
        BoardGetAll();
      }, []);
  
    // 게시판 카테고리별 가져오기
    useEffect(() => {
      const onClickCategory = async() => {
        if (selectCategory) {
          const rsp = await BoardAPI.BoardGetByCategory(selectCategory);
          if (rsp.status === 200) setSelectedBoardInfo(rsp.data);
          console.log(rsp.data);
        }
      };
      onClickCategory();
    }, [selectCategory]);
  
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
  
    const handleCategoryClick = (category) => {
      setSelectCategory(category);
      setActiveButton(category); // 버튼이 클릭되면 해당 카테고리를 활성화 상태로 설정
    };
    // 게시판 최신순 정렬
    const onClickNewestBoard = async() => {
        const rsp = await BoardAPI.BoardGetByNewest();
        setSelectedBoardInfo(rsp.data);
      }
    const boardClick = (communityId) => {
      navigate(`/BoardArticle/${communityId}`);
    }
    return (
      <Container justifyContent="center" alignItems="center">
        <BodyContainer>
          <Title><h1>커뮤니티</h1></Title>
          <Category>
        <CatButton
          isActive={activeButton === ""}
          onClick={() => {
            BoardGetAll();
            handleCategoryClick("");
          }}
        >
          전체
        </CatButton>
        <CatButton
          isActive={activeButton === "FREE_BOARD"}
          onClick={() => handleCategoryClick("FREE_BOARD")}
        >
          자유게시판
        </CatButton>
        <CatButton
          isActive={activeButton === "Q_A"}
          onClick={() => handleCategoryClick("Q_A")}
        >
          Q&A
        </CatButton>
        <CatButton
          isActive={activeButton === "FIND_PARTY"}
          onClick={() => handleCategoryClick("FIND_PARTY")}
        >
          파티원 찾기
        </CatButton>
      </Category>
          <Arrange>
                <ArrButton >
                <input type="radio" name="arrange" id="newest" onClick={onClickNewestBoard}/>
                <label htmlFor="newest">최신순</label>
                </ArrButton>
                <ArrButton>
                <input type="radio" name="arrange" id="likest" />
                <label htmlFor="likest">인기순</label>
                </ArrButton>
            </Arrange>
          {selectedBoardInfo.map((community) => (
            <BoardText key={community.communityTitle}>
              <BoardContents onClick={() => boardClick(community.communityId)}>
                <BCategory>{getCategoryText(community.communityCategory)}</BCategory>
                <BTitle>{community.communityTitle}</BTitle>
                <BTime>{formatDate(community.writtenTime)}</BTime>
              </BoardContents>
            </BoardText>
          ))}
          <WriteButton onClick={()=> navigate("/WriteBoard")}>글쓰기</WriteButton>
        </BodyContainer>
      </Container>
    );
  };
  
  export default Board;