import React, { useEffect, useRef, useState } from "react";
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
	useEffect(() => {
		const LoadFestivalData = async() => {
			const response = await FestivalAPI.getFestivalInfo();
			console.log(response);
		}
		LoadFestivalData();
	},[])
	

	return(
		<div>
    	<Header />
        <BodyContainer>
          <SearchSideBar/>
					<MapContainer>
						<NaverMap />
						<FestivalSearchCategory/>
					</MapContainer>
        </BodyContainer>
		</div>
  );
};
export default Festival;