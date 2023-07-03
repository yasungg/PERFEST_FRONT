import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Container as BaseContainer } from "../components/StandardStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import festivalPoster from "../images/2023-대한민국-과학축제-포스터.webp";
import festivalPoster2 from "../images/2023안양충훈벚꽃축제.jpg"
import NaverMap from "../components/NaverMap";

const BodyContainer = styled.div`
  width: 100%;
	height: 100%;
  display: flex;

	.searchContainer {
		display: inline-block;
		max-width: 400px;
		min-width: 400px;
		height: 100vh;
		/* background: linear-gradient(to right, #654ea3, #eaafc8); */
		background-color: #FFF;
		overflow-y: hidden;
		z-index: 3;
		box-shadow: 1px 0px 5px 0px #555555
	}

	.mapContainer {
		display: flex;
		width: 100%;
		height: 100vh;
		position: relative;
		background-color: black;
	}

	/* searchContainer 영역 */
	.search_area {
		display: flex;
		width: 100%;
		height: 8%;
		min-height: 74.95px;
		align-items: center;
		justify-content: center;
		box-shadow: 5px 0 5px -5px #333;
		border-bottom: 1px solid lightgray;
	}

	.input_box_area {
		display: flex;
		width: 90%;
		height: 45px;
		border-radius: 5px;
		border: 1px solid transparent;
		background-image: linear-gradient(#FFF, #FFF),
		linear-gradient(to right, #fbfcb9be, #ffcdf3aa, #65d3ffaa);
		/* linear-gradient(to right, #7E2BFE, #23C3F4); */
		background-origin: border-box;
		background-clip: content-box, border-box;
		outline: none;
		font-size: 13px;
		box-shadow: 1px 1px 4px -1px #555555;
		margin: 0px -5px;
	}

	.search {
		width: 83%;
		height: 43px;
		background-color: #FFF;
		border: none;
		outline: none;
		font-size: 13px;
		margin-left: 15px;
	}

	.search_button {
		margin: 3px;
		width: 40px;
		height: 40px;
		cursor: pointer;
		background-color: #FFF;
		border: none;
		border-radius: 5px;
		box-shadow: 1px 1px 4px -1px #555555;
	}
	
	.list_container {
		display: block;
		align-items: center;
		justify-content: center;
		width: auto;
		height: 92%;
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

	.result {
			display: flex;
			width: 100%;
			height: 40px;
			/* min-height: 40px; */
			align-items: center;
			justify-content: center;
			background-color: #FFF;
		}

	/* ol */
	.result_sort {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
	}

	.result_sort li:not(:last-child)::after {
		content: "";
		display: inline-block;
		width: 1px;
		height: 10px;
		background-color: lightgray;
		margin: 0px 5px;
	}

	/* ol li */
	.date_sort, .distance_sort {
		display: inline-block;
		list-style: none;
		}

	/* ol li a */
	.result_sort a {
		font-size: 12px;
		text-decoration: none;
		color: black;
	}

	.result_sort a:hover {
		text-decoration: underline;
	}
	
	.result_sort a:active{
		color: #0475F4;
	}


	/* 결과 카드 ul */
	.card_list {
		width: 100%;
		margin: 0;
		padding: 0;
	}

	/* 결과 카드 ul li */
	.card_wrap {
		display: flex;
		flex-direction: column;
		list-style: none;
		background-color: #FFF;
		width: 100%;
		height: 300px;
		justify-content: center;
		align-items: center;
		background-color: #FFF;
		border-bottom: 1px solid lightgray;
		margin: 20px 0;
	}

	.card_inner {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto 1fr;
  gap: 10px;
	width: 350px;
	align-items: center;
	justify-content: center;
}

.card_inner p {
	font-size: 13px;
}

.img_area {
	position: relative;
  grid-row: 1 / span 2;
	cursor: pointer;
	overflow: hidden;
}

.img_area img {
	width: 120px;
	margin-right: 10px;
	transition: transform 0.3s ease;
}

.img_area img:hover {
	transform: scale(1.1);
	position: relative;
}

.text_area {
  grid-column: 2;
  grid-row: 1;
	margin: 10px 0;
}

.text_area a {
	font-size: 18px;
	font-weight: bold;
	text-decoration: none;
	color: #0475F4;
}

.text_area p {
	margin: 10px 0;
	margin-right: 20px;
}

.content_area {
  grid-column: 1 / span 2;
  grid-row: 3;
	background-color: #FFF5FB;
	border-radius: 10px;
	cursor: pointer;
}

.content_area:hover {
	background-color: #F4EBFF;
}

.content_area p, .address {
	margin: 20px;
	display: -webkit-box;
  -webkit-line-clamp: 2; /* 보여줄 줄 수 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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

	/* 버블필터 ul */
	.bubble_filter_list {
		position: relative;
		display: inline-block;
		width: 100%;
		align-items: center;
		justify-content: center;
		padding: 5px;
		margin: 7px 0;
	}

	/* 버블필터 li */
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

	const testData = [
		{
			"축제명":"2023 안양충훈벚꽃축제",
			"개최장소":"안양충훈2교일대",
			"축제시작일자":"2023-04-08",
			"축제종료일자":"2023-04-09",
			"축제내용":"벚꽃콘서트+ 버스킹공연+ 벚꽃체험부스+ 푸드트럭&먹거리+ 벚꽃컬러링북+ SNS이벤트 등",
			"주관기관":"(재)안양문화예술재단",
			"주최기관":"안양시+안양충훈벚꽃축제추진위원회",
			"후원기관":"",
			"전화번호":"031-687-0500",
			"홈페이지주소":"http://www.ayac.or.kr",
			"관련정보":"안양예술공원+ APAP+ 김중업박물관",
			"소재지도로명주소":"경기도 안양시 만안구 석수로 159",
			"소재지지번주소":"경기도 안양시 만안구 석수동 797번지",
			"위도":"37.40461526",
			"경도":"126.8961574",
			"데이터기준일자":"2023-04-27",
			"제공기관코드":"3830000",
			"제공기관명":"경기도 안양시"
		},
		{
			"축제명":"합천바캉스축제",
			"개최장소":"정양레포츠공원",
			"축제시작일자":"2023-07-29",
			"축제종료일자":"2023-08-06",
			"축제내용":"전국에서 가장 HOT한 합천에서 가족과 함께하는 바캉스",
			"주관기관":"경상남도 합천군청","주최기관":"경상남도 합천군청",
			"후원기관":"경상남도",
			"전화번호":"055-930-4666",
			"홈페이지주소":"http://www.hcvacance.kr/",
			"관련정보":"",
			"소재지도로명주소":"경상남도 합천군 대양면 동부로 39-19",
			"소재지지번주소":"경상남도 합천군 대양면 정양리 613-2",
			"위도":"35.5573152",
			"경도":"128.1675442",
			"데이터기준일자":"2023-04-11",
			"제공기관코드":"5480000",
			"제공기관명":"경상남도 합천군"
		},
		{
			"축제명":"제5회 명품한강 장미축제",
			"개최장소":"자양3동 현대6차~8차 아파트사이",
			"축제시작일자":"2023-05-20",
			"축제종료일자":"2023-05-20",
			"축제내용":"장미를 테마로 한 자양3동 주민이 화합하여 만드는 마을축제",
			"주관기관":"자양3동 문화행사위원회",
			"주최기관":"자양3동문화행사위원회",
			"후원기관":"서울특별시 광진구청",
			"전화번호":"02-450-1803",
			"홈페이지주소":"",
			"관련정보":"",
			"소재지도로명주소":"서울특별시 광진구 자양번영로3길 66",
			"소재지지번주소":"",
			"위도":"",
			"경도":"",
			"데이터기준일자":"2023-04-14",
			"제공기관코드":"3040000",
			"제공기관명":"서울특별시 광진구"}
	]

	// 축제 데이터 ex
	// 필요한 데이터 (축제명, 개최장소, 기간, 내용, 주소, 위도 / 경도, 전화번호)

	
	return(
		<Container
			justifyContent="center">	
    	<Header />
        <BodyContainer>
					{/* 검색창 / 결과창 */}
          <div className="searchContainer" onClick={() => {setIsOpenLocation(false)}}>
						{/* 검색창 */}
						<div className="search_area">
							<div className="input_box_area">
							<input className="search" type="text" placeholder="찾을 지역이나 축제 이름을 입력하세요."></input>
							<button className="search_button">돋보기</button>
							</div>
						</div>
						{/* 검색 결과 */}
            <div className="list_container">
            <div className="result">
							<p>검색된 결과 '0'개가 있습니다.</p>
							{/* 결과 정렬버튼 */}
							<ol className="result_sort">
								<li className="date_sort">
									<a href="#none">날짜순</a>
								</li>
								<li className="distance_sort">
									<a href="#none">거리순</a>
								</li>
							</ol>
						</div>
						{/* 결과 카드 */}
							<ul className="card_list">
								<li className="card_wrap">
									<div className="card_inner">
										<div className="img_area">
											<img src={festivalPoster2} alt="festival_poster"></img>
										</div>
										<div className="text_area">
											<a href="#none"><strong>안양충훈벚꽃축제</strong></a>
											<p>2023.04.08 ~ 2023.04.09</p>
											<p className="address">경기도 안양시 만안구 석수동 797번지경기도 안양시 만안구 석수동 797번지경기도 안양시 만안구 석수동 797번지</p>
											<p>031-687-0500</p>
										</div>
										<div className="content_area">
											<p>
												벚꽃콘서트, 버스킹공연, 벚꽃체험부스, 푸드트럭&먹거리, 벚꽃컬러링북, SNS이벤트 등벚꽃콘서트, 버스킹공연, 벚꽃체험부스, 푸드트럭&먹거리, 벚꽃컬러링북, SNS이벤트 등벚꽃콘서트, 버스킹공연, 벚꽃체험부스, 푸드트럭&먹거리, 벚꽃컬러링북, SNS이벤트 등
											</p>
										</div>
									</div>
								</li>

								<li className="card_wrap">
									<div className="card_inner">
										<div className="img_area">
											<img className="festival_img" src={festivalPoster2} alt="festival_poster"></img>
										</div>
										<div className="text_area">
											<a href="#none"><strong>안양충훈벚꽃축제</strong></a>
											<p className="festival_period">2023.04.08 ~ 2023.04.09</p>
											<p className="festival_location">경기도 안양시 만안구 석수동 797번지</p>
											<p className="festival_tel">031-687-0500</p>
										</div>
										<div className="content_area">
											<p className="festival_content">
												벚꽃콘서트, 버스킹공연, 벚꽃체험부스, 푸드트럭&먹거리, 벚꽃컬러링북, SNS이벤트 등
											</p>
										</div>
									</div>
								</li>

								<li className="card_wrap">
									<div className="card_inner">
										<div className="img_area">
											<img className="festival_img" src={festivalPoster2} alt="festival_poster"></img>
										</div>
										<div className="text_area">
											<a href="#none"><strong>안양충훈벚꽃축제</strong></a>
											<p className="festival_period">2023.04.08 ~ 2023.04.09</p>
											<p className="festival_location">경기도 안양시 만안구 석수동 797번지</p>
											<p className="festival_tel">031-687-0500</p>
										</div>
										<div className="content_area">
											<p className="festival_content">
												벚꽃콘서트, 버스킹공연, 벚꽃체험부스, 푸드트럭&먹거리, 벚꽃컬러링북, SNS이벤트 등
											</p>
										</div>
									</div>
								</li>
							</ul>
            </div>
					</div>

					{/* 지도 */}
					<div className="mapContainer">
						<NaverMap />
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
						{/* 줌 기능 */}
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