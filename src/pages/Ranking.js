import styled from "styled-components";
import { BodyContainer, Container } from "../components/StandardStyles";
import RankingAPI from "../api/RankingAPI";
import { useState } from "react";
const RankingCategory = styled.div`
`;
const RankButton = styled.div`
`;
const Ranking = () => {
    const [richRanking, setRichRanking] = useState([]);
    const [badgeranking, setBadgeRanking] = useState([]);
    const getRichRanking = async() => {
        const response = await RankingAPI.GetRichRanking();
        console.log(response.data);
        setRichRanking(response.data);
    }
    const getBadgeRanking = async() => {
        const response = await RankingAPI.GetBadgeRanking();
        setBadgeRanking(response.data);
    }


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