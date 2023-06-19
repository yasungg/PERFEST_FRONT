import React from "react";
import styled from "styled-components";
import { Container } from "../components/StandardStyles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import festivalPoster from "../images/2023-대한민국-과학축제-포스터.webp";

const BodyContainer = styled.div`
  width: 100%;
	height: 100%;
  display: flex;

	.search_container {
		max-width: 400px;
		min-width: 400px;
		height: auto;
		background-color: aliceblue;
	}

	.map_container {
		width: 100%;
		height: 100vh;
		background-color: lightgoldenrodyellow;
	}

	.input_box {
		display: flex;
		width: 100%;
		height: 70px;
		background-color: black;
		align-items: center;
		justify-content: center;
	}

	.search {
		width: 75%;
		height: 45px;
	}

	.search_button {
		margin: 5px;
		width: 50px;
		height: 50px;
	}

	.result {
		display: flex;
		width: 100%;
		height: 40px;
		align-items: center;
		justify-content: center;
		background-color: red;
	}

	.list_container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: auto;
		height: auto;
		background-color: aquamarine;
	}

	/* ul */
	.card_list {
			margin: 0;
			padding: 0;
		}

	/* li */
	.card {
		/* display: flex; */
		margin: 30px;
		list-style: none;
		border: 1px solid black;
		flex-direction: column;
		background-color: #FFF;
		width: 350px;
		height: 200px;
		justify-content: center;
		align-items: center;
	}

	.poster {
		width: 120px;
		float: left;
	}

	.festival_name, .festival_season {
		/* width: 200px; */
		border: 1px solid gray;
		margin: 5px;
	}

	.festival_content {

	}

	.map {
		background-size: cover;
		background-image: url("https://t1.daumcdn.net/cfile/tistory/9968D2465E832E5A34") ;
	}

`;

const Festival = () => {

	return(
		<Container justifyContent="center">
    	<Header />
        <BodyContainer>
          <div className="search_container">
						<div className="input_box">
							<input className="search" type="text" placeholder="찾을 지역이나 축제 이름을 입력하세요"></input>
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
									<div className="festival_name">2023년 대한민국 과학축제</div>
									<div className="festival_season">2023.04.27 ~ 2023.04.30</div>
									<div className="festival_content">대전 엑스포시민광장 및 엑스포과학공원 일원</div>
								</li>
								<li className="card">
									<img className="poster" src={festivalPoster} alt="festival_poster"></img>
									<div className="festival_name">2023년 대한민국 과학축제</div>
									<div className="festival_season">2023.04.27 ~ 2023.04.30</div>
									<div className="festival_content">대전 엑스포시민광장 및 엑스포과학공원 일원</div>
								</li>
							</ul>
            </div>
					</div>
					<div className="map_container">
						<div className="category_container"></div>
						<div className="map"></div>
					</div>
              
            
        </BodyContainer>
      <Footer />
    </Container>
  );
};
export default Festival;