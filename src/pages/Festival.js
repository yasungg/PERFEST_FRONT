import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Container as BaseContainer } from "../components/StandardStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import festivalPoster from "../images/2023-대한민국-과학축제-포스터.webp";
import KakaoMap from "../components/KakaoMap";

const BodyContainer = styled.div`
  width: 100%;
	height: 100%;
  display: flex;

	.searchContainer {
		display: inline-block;
		max-width: 400px;
		min-width: 400px;
		height: auto;
		background: linear-gradient(to right, #654ea3, #eaafc8);
		overflow-y: hidden;
		z-index: 3;
		box-shadow: 1px 0px 5px 0px #555555
	}

	.mapContainer {
		display: flex;
		width: 100%;
		height: 100%;
		position: relative;
	}

	/* searchContainer 영역 */
	.input_box {
		display: flex;
		width: 100%;
		height: 8%;
		min-height: 74.95px;
		align-items: center;
		justify-content: center;
		box-shadow: 5px 0 5px -5px #333;
	}

	.search {
		width: 75%;
		height: 45px;
		border-radius: 5px;
		border: none;
		outline: none;
		padding-left: 15px;
		font-size: 13px;
		box-shadow: 1px 1px 4px -1px #555555;
	}

	.search_button {
		margin: 3px;
		width: 47px;
		height: 47px;
		cursor: pointer;
		background-color: #FFF;
		border: none;
		border-radius: 5px;
		box-shadow: 1px 1px 4px -1px #555555;
	}

	.result {
		display: flex;
		width: 100%;
		height: 4%;
		min-height: 40px;
		align-items: center;
		justify-content: center;
		background-color: aliceblue;
		border-bottom: 1px solid lightgray;
	}

	.list_container {
		display: block;
		align-items: center;
		justify-content: center;
		width: auto;
		height: 88%;
		min-height: 80;
		margin-top: auto;
		background-color: #FFF;
		overflow-y: auto;
		overflow-x: hidden;

		.show-scroll {
			overflow-y: scroll;
		}

		/* 스크롤바 커스터마이징 */
		&::-webkit-scrollbar {
			width: 10px;
			background: #F4EBFF;
			border-radius: 2px;
  	}

		&::-webkit-scrollbar-thumb {
			/* background: #FED4E5; */
			background: lightgray;
			border-radius: 10px;
			background-clip: padding-box;
			border: 1px solid transparent;
			/* height: 20px; */
		}

		&::-webkit-scrollbar-track {
			box-shadow: inset 0px 0px 3px gray;
		}
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
		/* border: 1px solid gray; */
		border-radius: 5px;
		margin: 5px 0;
		margin-right: 10px;
		background-color: #F4EBFF;
	}
	
	/* mapContainer 영역 */
	.category_container {
		position: absolute;
		display: block;
		margin: 0 10px;
		width: 510px;
		height: 74.95px;
		z-index: 2;
	}

	/* ul */
	.bubble_filter_list {
		position: relative;
		display: inline-block;
		width: 100%;
		align-items: center;
		justify-content: center;
		padding: 5px;
		margin: 7px 0;
	}

	/* li */
	.bubble_filter_item {
		display: list-item;
		list-style: none;
		float: left;
	}

	.bubble_filter_button_location, .bubble_filter_button_period, .bubble_filter_button_theme {
		width: 120px;
		height: 50px;
		font-size: 15px;
		font-weight: 600;
		color: #242424;
		border: none;
		border-radius: 5px;
		background-color: #fff;
		margin-right: 20px;
		cursor: pointer;
		box-shadow: 1px 1px 4px 0px #555555;
	}

  /* 지역별 검색 */
	.location_search_area {
		width: 550px;
		height: 220px;
		background-color: #FFF;
		margin: -10px 0 0 5px;
		border-radius: 5px;
		box-shadow: 1px 1px 5px -1px #555555;
	}

	.location_checkbox_area {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		height: 180px;
		justify-content: center;
		align-items: center;
	}

	.location_checkbox {
		display: flex;
		width: 95px;
		height: 40px;
		border: 0.5px solid lightgray;
		border-radius: 4px;
		margin: 5px;
		align-items: center;
		box-shadow: 1px 1px 5px 0px #E2E2E2;
	}

	.location_checkbox:hover {
		background-color: #FFF5FB;
	}
	
	.location_search_area input {
		width: 14px;
		height: 14px;
		margin: 7px; 
		cursor: pointer;
	}
	
	.location_checkbox label {
		font-size: 15px;
		font-weight: 1000	;
		cursor: pointer;
	}
	
	.location_checkbox label:hover {
		color: #0475F4;
	}

	.location_search_button {
		width: 50px;
		height: 30px;
		background-color: #FFF;
		border: 0.5px solid lightgray;
		border-radius: 5px;
		float: right;
		margin: 0 10px;
		cursor: pointer;
		box-shadow: 1px 1px 5px 0px #E2E2E2;
	}

  /* 기간별 검색 */
	.period_search_area {
		display: flex;
		flex-direction: column;
		width: 300px;
		height: 110px;
		margin: -10px 0 0 145px;
		background-color: #FFF;
		border-radius: 5px;
		z-index: 2;
		justify-content: center;
		align-items: center;
		box-shadow: 1px 1px 5px -1px #555555;
	}

	.period_search_area div {
		display: flex;
		width: 90%;
		height: 40px;
		justify-content: center;
		align-items: center;
		border: 0.5px solid lightgray;
		border-radius: 4px;
		margin-top: 15px;
		box-shadow: 1px 1px 5px 0px #E2E2E2;
	}

	.period_search_area input {
		margin: 10px;
		cursor: pointer;
	}

  .period_search_button {
    width: 50px;
		height: 30px;
		margin: 10px 15px;
		background-color: #FFF;
		border: 0.5px solid lightgray;
		border-radius: 5px;
		align-self: flex-end;
		cursor: pointer;
		box-shadow: 1px 1px 5px 0px #E2E2E2;
  }

  /* 계절별 검색 */
  .season_search_area {
    display: flex;
		flex-direction: column;
    width: 340px;
		height: 110px;
    margin: -10px 0 0 285px;
    background-color: #FFF;
    border-radius: 5px;
    z-index: 2;
		box-shadow: 1px 1px 5px -1px #555555;
  }

	.season_checkbox_area {
		display: flex;
		width: 100%;
		height: 40px;
		margin-top: 15px;
		justify-content: center;
		align-items: center;
	}

	.season_checkbox {
		display: flex;
		width: 68px;
		height: 38px;
		border: 0.5px solid lightgray;
		border-radius: 4px;
		margin: 5px;
		align-items: center;
		box-shadow: 1px 1px 5px 0px #E2E2E2;
	}

	.season_checkbox:hover {
		background-color: #FFF5FB;
	}

	.season_checkbox input {
		width: 14px;
		height: 14px;
		margin: 7px;
		cursor: pointer;
	}

	.season_checkbox label {
		font-size: 15px;
		font-weight: 1000;
		cursor: pointer;
	}

	.season_checkbox label:hover {
		color: #0475F4;
	}

	.season_search_button {
		width: 50px;
		height: 30px;
		background-color: #FFF;
		margin: 10px 15px;
		border: 0.5px solid lightgray;
		border-radius: 5px;
		align-self: flex-end;
		cursor: pointer;
		box-shadow: 1px 1px 5px 0px #E2E2E2;
	}

  /* 지도 조종 영역 */
	.map_control_area {
		position: absolute;
		z-index: 2;
		bottom: 10px;
		right: 10px;
	}

	.zoom_control_area {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
	}

	.zoom_in, .zoom_out {
		margin: 0.15px 0;
		width: 35px;
		height: 35px;
		background-color: #FFF;
		border: 0.5px solid gray;
		border-radius: 3px;
		cursor: pointer;
		font-size: 18px;
		box-shadow: 1px 1px 5px -1px #555555;
	}

	.my_location {
		width: 35px;
		height: 35px;
		background-color: #FFF;
		border: 0.5px solid gray;
		border-radius: 3px;
		cursor: pointer;
		box-shadow: 1px 1px 5px -1px #555555;
	}
`;
// 전체 페이지 스크롤바 숨김 기능
const Container = styled(BaseContainer)`
	-ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }
`


const Festival = () => {

	// bubble filrer 버튼 hover 기능
	const [isLocationHovered, setLocationIsHovered] = useState(false);
	const [isPeriodHovered, setIsPeriodHovered] = useState(false);
	const [isThemeHovered, setIsThemeHovered] = useState(false);

	const handleLocationButtonHover = () => {
		setLocationIsHovered(true);
	};
	const handleLocationButtonLeave = () => {
		setLocationIsHovered(false);
	}

	const handlePeriodButtonHover = () => {
		setIsPeriodHovered(true);
	}
	const handlePeriodButtonLeave = () => {
		setIsPeriodHovered(false);
	}

	const handleThemeButtonHover = () => {
		setIsThemeHovered(true);
	}
	const handleThemeButtonLeave = () => {
		setIsThemeHovered(false);
	}

	// bubble filter 버튼 펼치기 / 닫기 기능
	const [isOpenLocation, setIsOpenLocation] = useState(false);
	const [isOpenPeriod, setIsOpenPeriod] = useState(false);
	const [isOpenSeason, setIsOpenSeason] = useState(false);
	const formRef = useRef(null);

  // 다른 필터 닫기
  const handleFilterButtonClick = (filterName, isOpenState, setIsOpenState) => {
    setIsOpenState(!isOpenState);

    if(filterName !== 'location') {
      setIsOpenLocation(false);
    }

    if(filterName !== 'period') {
      setIsOpenPeriod(false);
    }

    if(filterName !== 'season') {
      setIsOpenSeason(false);
    }
  }

  // 지역별 검색
	useEffect(() => {
		const handleClickOutside = (event) => {
			if(formRef.current && !formRef.current.contains(event.target)) {
				setIsOpenLocation(false);
			}
		};

		const hanldeEscapeKey = (event) => {
			if(event.key === 'Escape') {
				setIsOpenLocation(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', hanldeEscapeKey);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', hanldeEscapeKey);
		};
	}, []);

  // 기간별 검색
  useEffect(() => {
		const handleClickOutside = (event) => {
			if(formRef.current && !formRef.current.contains(event.target)) {
				setIsOpenPeriod(false);
			}
		};

		const hanldeEscapeKey = (event) => {
			if(event.key === 'Escape') {
				setIsOpenPeriod(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', hanldeEscapeKey);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', hanldeEscapeKey);
		};

	}, []);

  // 계절별 검색
  useEffect(() => {
		const handleClickOutside = (event) => {
			if(formRef.current && !formRef.current.contains(event.target)) {
				setIsOpenSeason(false);
			}
		};

		const hanldeEscapeKey = (event) => {
			if(event.key === 'Escape') {
				setIsOpenSeason(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', hanldeEscapeKey);

		return () => {
			document.removeEventListener('click', handleClickOutside);
			document.removeEventListener('keydown', hanldeEscapeKey);
		};

	}, []);
	
	return(
		<Container
			justifyContent="center">	
    	<Header />
        <BodyContainer>

					{/* 검색창 / 결과창 */}
          <div className="searchContainer" onClick={() => {setIsOpenLocation(false)}}>
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
										<div className="festival_name"><strong>2023년 대한민국 과학축제</strong></div>
										<div className="festival_season">2023.04.27 ~ 2023.04.30</div>
										<div className="festival_content">대전 엑스포시민광장 및 엑스포과학공원 일원</div>
									</div>
								</li>
								<li className="card">
									<img className="poster" src={festivalPoster} alt="festival_poster"></img>
										<div className="card_content">
										<div className="festival_name"><strong>2023년 대한민국 과학축제</strong></div>
										<div className="festival_season">2023.04.27 ~ 2023.04.30</div>
										<div className="festival_content">대전 엑스포시민광장 및 엑스포과학공원 일원</div>
									</div>
								</li>
								<li className="card">
									<img className="poster" src={festivalPoster} alt="festival_poster"></img>
										<div className="card_content">
										<div className="festival_name"><strong>2023년 대한민국 과학축제</strong></div>
										<div className="festival_season">2023.04.27 ~ 2023.04.30</div>
										<div className="festival_content">대전 엑스포시민광장 및 엑스포과학공원 일원</div>
									</div>
								</li><li className="card">
									<img className="poster" src={festivalPoster} alt="festival_poster"></img>
										<div className="card_content">
										<div className="festival_name"><strong>2023년 대한민국 과학축제</strong></div>
										<div className="festival_season">2023.04.27 ~ 2023.04.30</div>
										<div className="festival_content">대전 엑스포시민광장 및 엑스포과학공원 일원</div>
									</div>
								</li><li className="card">
									<img className="poster" src={festivalPoster} alt="festival_poster"></img>
										<div className="card_content">
										<div className="festival_name"><strong>2023년 대한민국 과학축제</strong></div>
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
									<button
										className="bubble_filter_button_location"
										onClick={() => handleFilterButtonClick('location', isOpenLocation, setIsOpenLocation)}
										onMouseEnter={handleLocationButtonHover}
										onMouseLeave={handleLocationButtonLeave}
										style={{color: isOpenLocation || isLocationHovered ? '#0475F4' : 'black'}}
										>@ 지역별 검색</button>
								</li>

								<li className="bubble_filter_item">
									<button
                    className="bubble_filter_button_period"
                    onClick={() => handleFilterButtonClick('period', isOpenPeriod, setIsOpenPeriod)}
									  onMouseEnter={handlePeriodButtonHover}
									  onMouseLeave={handlePeriodButtonLeave}
									  style={{color: isOpenPeriod || isPeriodHovered ? '#0475F4' : 'black'}}
									>@ 기간별 검색</button>
								</li>

								<li className="bubble_filter_item">
									<button
										className="bubble_filter_button_theme"
                    onClick={() => handleFilterButtonClick('season', isOpenSeason, setIsOpenSeason)}
										onMouseEnter={handleThemeButtonHover}
										onMouseLeave={handleThemeButtonLeave}
										style={{color: isOpenSeason || isThemeHovered ? '#0475F4' : 'black'}}
										>@ 계절별 검색</button>
								</li>
							</ul>

							{/* 지역별 검색 */}
							{isOpenLocation && (
							<form className="location_search_area">
								<div className="location_checkbox_area">
									<div className="location_checkbox">
										<input type="checkbox" id="서울" />
										<label htmlFor="서울">서울</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="경기도" />
										<label htmlFor="경기도">경기도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="강원도" />
										<label htmlFor="강원도">강원도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="충청북도" />
										<label htmlFor="충청북도">충청북도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="충청남도" />
										<label htmlFor="충청남도">충청남도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="경상북도" />
										<label htmlFor="경상북도">경상북도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="경상남도" />
										<label htmlFor="경상남도">경상남도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="전라북도" />
										<label htmlFor="전라북도">전라북도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="전라남도" />
										<label htmlFor="전라남도">전라남도</label>
									</div>
									<div className="location_checkbox">
										<input type="checkbox" id="제주도" />
										<label htmlFor="제주도">제주도</label>
									</div>
								</div>
								<button className="location_search_button">검색</button>
							</form>
							)}

              {/* 기간별 검색 */}
              {isOpenPeriod && (
							<form className="period_search_area">
								<div>
									<input type="date"></input>
									<p>~</p>
									<input type="date"></input>
								</div>
								<button className="period_search_button">검색</button>
							</form>
              )}
              
              {/* 계절별 검색 */}
              {isOpenSeason && (
              <form className="season_search_area">
                <div className="season_checkbox_area">
									<div className="season_checkbox">
										<input type="checkbox" id="spring"/>
										<label htmlFor="spring">봄</label>
									</div>
									<div className="season_checkbox">
										<input type="checkbox" id="summer"/>
										<label htmlFor="summer">여름</label>
									</div>
									<div className="season_checkbox">
										<input type="checkbox" id="autumn"/>
										<label htmlFor="autumn">가을</label>
									</div>
									<div className="season_checkbox">
										<input type="checkbox" id="winter"/>
										<label htmlFor="winter">겨울</label>
									</div>
                </div>
                <button className="season_search_button">검색</button>
              </form>
              )}

						</div>
						
						<div className="map_control_area">
							<div className="zoom_control_area">
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