import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import NaverMap from "../components/NaverMap";
import FestivalAPI from "../api/FestivalAPI";
import SearchSideBar from "../components/SearchSideBar";
import FestivalSearchCategory from "./FestivalSearchCategory";

const BodyContainer = styled.div`
  width: 100%;
	height: 100%;
  display: flex;
`;

const MapContainer = styled.div`
	display: flex;
	width: 100%;
	position: relative;
`

const Festival = () => {
	const [propsData, setPropsData] = useState("");
	const [isData, setIsData] = useState(false);
	const [festivalData, setFestivalData] = useState();
	const ClickEvent = () => {
		setIsData(true);
		console.log(isData);
	}
	useEffect(() => {
		// 페이지 렌더링 될 때 백엔드에서 공공api를 DB에 저장하도록 하는 로직
		const saveFestivalInfoToDB = async() => {
			// response 가 true 면 DB에 저장 성공한 것!
			const response = await FestivalAPI.saveFestivalInfo();
			if(response.status === 200) {
				console.log("DB에 저장완료");
			}
		}
		isData && saveFestivalInfoToDB();
	},[isData])

	useEffect(()=>{
		const getFestivalData = async() => {
			console.log("getFestival 실행");
			const response = await FestivalAPI.getFestivalInfo();
			if(response.status === 200) {
				setFestivalData(response.data);
			}
		}
		isData && getFestivalData();
	},[isData])	

	return(
		<div>
    	<Header/>
			<button onClick={()=>{ClickEvent()}}>공공api 테스트</button>
        <BodyContainer>
          <SearchSideBar/>
					<MapContainer>
						<NaverMap festivalData={festivalData}/>
						<FestivalSearchCategory setPropsData={setPropsData} />
					</MapContainer>
        </BodyContainer>
		</div>
  );
};
export default Festival;