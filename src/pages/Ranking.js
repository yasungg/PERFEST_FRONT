import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
const RankingCategory = styled.div`
`;
const RankButton = styled.div`
`;
const Ranking = () => {
    return(
        <Container>
            <BodyContainer>
                <RankingCategory>
                    <RankButton>
                    <input type="radio" name="rankingCategory"/>
                    <label for="bedge">뱃지 랭킹</label>
                    </RankButton>
                    <RankButton>
                    <input type="radio" name="rankingCategory"/>
                    <label for="rich">큰손 랭킹</label>
                    </RankButton>
                </RankingCategory>
            </BodyContainer>
        </Container>
    );
};
export default Ranking;