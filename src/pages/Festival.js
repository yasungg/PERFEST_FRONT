import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../components/StandardStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import festivalPoster from "../images/2023-대한민국-과학축제-포스터.webp";
import KakaoMap from "../components/KakaoMap";

const BodyContainer = styled.div`
  width: 100%;
	height: 100%;
  display: flex;

	.searchContainer {
		max-width: 400px;
		min-width: 400px;
		height: auto;
		background: linear-gradient(to right, #654ea3, #eaafc8);
	}

	.mapContainer {
		display: flex;
		width: 100%;
		height: 100vh;
		position: relative;
	}

	/* searchContainer 영역 */
	.input_box {
		display: flex;
		width: 100%;
		height: 8vh;
		min-height: 74.95px;
		background-color: b;
		align-items: center;
		justify-content: center;
	}

	.search {
		width: 75%;
		height: 45px;
		border-radius: 5px;
		border: none;
		outline: none;
		padding-left: 15px;
		font-size: 15px;
	}

	.search_button {
		margin: 3px;
		width: 47px;
		height: 47px;
		cursor: pointer;
		background-color: #FFF;
		border: none;
		border-radius: 5px;
	}

	.result {
		display: flex;
		width: 100%;
		height: 4vh;
		min-height: 38.47px;
		align-items: center;
		justify-content: center;
		background-color: aliceblue;
		border-bottom: 1px solid lightgray;
	}

	.list_container {
		display: flexbox;
		align-items: center;
		justify-content: center;
		width: auto;
		height: 88vh;
		background-color: #FFF;
		overflow: auto;
		overflow-x: hidden;
	}

	/* ul */
	.card_list {
		width: 100%;
		margin: 0;
		padding: 0;
	}

	/* li */
	.card {
		display: flexbox;
		margin: 30px 0;
		padding: 3px;
		list-style: none;
		/* border: 1px solid black; */
		flex-direction: column;
		background-color: #FFF;
		width: 100%;
		height: 220px;
		justify-content: center;
		align-items: center;
		background-color: #FFF;
		border-bottom: 1px solid lightgray;
	}

	.poster {
		width: 120px;
		float: left;
		margin: 5px 10px;
	}

	.festival_name, .festival_season {
		width: 200px;
		border: 1px solid gray;
		margin: 5px 0;
	}

	.festival_content {
		width: 200px;
		height: 100px;
		border: 1px solid gray;
		margin: 5px 0;
		margin-right: 10px;
	}
	
	/* mapContainer 영역 */
	.category_container {
		position: absolute;
		margin: 40px 10px;
		width: 510px;
		height: 50px;
		z-index: 2;
		
	}

	/* ul */
	.bubble_filter_list {
		display: inline-block;
		width: 100%;
		align-items: center;
		justify-content: center;
		padding: 5px;
		margin: 0;
	}

	/* li */
	.bubble_filter_item {
		display: list-item;
		list-style: none;
		float: left;
	}

	.bubble_filter_button {
		width: 120px;
		height: 50px;
		font-size: 15px;
		font-weight: 600;
		color: #242424;
		border: none;
		border-radius: 5px;
		background-color: #FFE3F1;
		margin-right: 20px;
		cursor: pointer;
	}

	.map_control {
		position: absolute;
		z-index: 2;
		bottom: 10px;
		right: 10px;
	}

	.zoom_control {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
	}

	.zoom_in, .zoom_out {
		margin: 0.08px 0;
		width: 35px;
		height: 35px;
		background-color: #FFF;
		border: 0.5px solid gray;
		border-radius: 2px;
		cursor: pointer;
	}

	.my_location {
		width: 35px;
		height: 35px;
		background-color: #FFF;
		border: 0.5px solid gray;
		border-radius: 2px;
		cursor: pointer;
	}

`;


const Festival = () => {
	
	// const { kakao } = window;
	// const{map, setMap} = useState(null);

	// useEffect(() => {
	// 	const container = document.getElementById('map');
	// 	const option = { center : new kakao.maps.Lating(33.450701, 126.570667) };
	// 	const kakaoMap = new kakao.maps.Map(container, option);
	// 	setMap(kakaoMap);
	// }, []);

	return(
		<Container justifyContent="center">
    	<Header />
        <BodyContainer>

					{/* 검색창 / 결과창 */}
          <div className="searchContainer">
						<div className="input_box">
							<input className="search" type="text" placeholder="찾을 지역이나 축제 이름을 입력하세요."></input>
							<button className="search_button">돋보기</button>
						</div>
            <div className="result">검색된 결과 '0'개가 있습니다.</div>
            <div className="list_container">
							<ul className="card_list">
								<li className="card">
									<img className="poster" src={festivalPoster} alt="festival_poster"></img>
										<div className="card_content">
										<div className="festival_name">2023년 대한민국 과학축제</div>
										<div className="festival_season">2023.04.27 ~ 2023.04.30</div>
										<div className="festival_content">대전 엑스포시민광장 및 엑스포과학공원 일원</div>
									</div>
								</li>
								<li className="card">
									<img className="poster" src={festivalPoster} alt="festival_poster"></img>
										<div className="card_content">
										<div className="festival_name">2023년 대한민국 과학축제</div>
										<div className="festival_season">2023.04.27 ~ 2023.04.30</div>
										<div className="festival_content">대전 엑스포시민광장 및 엑스포과학공원 일원</div>
									</div>
								</li>
								<li className="card">
									<img className="poster" src={festivalPoster} alt="festival_poster"></img>
										<div className="card_content">
										<div className="festival_name">2023년 대한민국 과학축제</div>
										<div className="festival_season">2023.04.27 ~ 2023.04.30</div>
										<div className="festival_content">대전 엑스포시민광장 및 엑스포과학공원 일원</div>
									</div>
								</li><li className="card">
									<img className="poster" src={festivalPoster} alt="festival_poster"></img>
										<div className="card_content">
										<div className="festival_name">2023년 대한민국 과학축제</div>
										<div className="festival_season">2023.04.27 ~ 2023.04.30</div>
										<div className="festival_content">대전 엑스포시민광장 및 엑스포과학공원 일원</div>
									</div>
								</li><li className="card">
									<img className="poster" src={festivalPoster} alt="festival_poster"></img>
										<div className="card_content">
										<div className="festival_name">2023년 대한민국 과학축제</div>
										<div className="festival_season">2023.04.27 ~ 2023.04.30</div>
										<div className="festival_content">대전 엑스포시민광장 및 엑스포과학공원 일원</div>
									</div>
								</li>
							</ul>
            </div>
					</div>

					{/* 지도 */}
					<div className="mapContainer">
						<KakaoMap />
						<div className="category_container">
							<ul className="bubble_filter_list">
								<li className="bubble_filter_item">
									<button className="bubble_filter_button">@ 지역별 검색</button>
									{/* 서울 대전 인천 부산 대구 광주 울산 */}
									{/* 경기도 강원도 충청북도 충청남도 경상북도 경상남도 전라북도 전라남도 제주도 */}
								</li>
								<li className="bubble_filter_item">
									<button className="bubble_filter_button">@ 기간별 검색</button>
								</li>
								<li className="bubble_filter_item">
									<button className="bubble_filter_button">@ 테마별 검색</button>
								</li>
							</ul>
						</div>
						<div className="map_control">
							<div className="zoom_control">
								<button className="zoom_in">+</button>
								<button className="zoom_out">-</button>
							</div>
							<button className="my_location">나</button>
						</div>
					</div>
        </BodyContainer>
      <Footer />
    </Container>
  );
};
export default Festival;