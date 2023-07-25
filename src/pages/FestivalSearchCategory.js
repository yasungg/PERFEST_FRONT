import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import FestivalAPI from "../api/FestivalAPI";


const BodyContainer = styled.div`
	height: 100%;
  display: flex;
	
	/* mapContainer 영역 */
	.category_container {
		position: absolute;
		display: block;
		z-index: 2;
    left : 10px;
	}

  /* 지역별 검색 */
	.location_checkbox_area {
		display: flex;
		flex-wrap: wrap;
		width: 550px;
		height: 150px;
		justify-content: center;
		align-items: center;
		background-color: #FFF;
		margin: -10px 0 0 5px;
		border-radius: 5px;
		box-shadow: 1px 1px 5px -1px #555555;
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
		cursor: pointer;
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
	
	.location_checkbox span {
		font-size: 15px;
		font-weight: 1000	;
		cursor: pointer;
	}
	
	.location_checkbox label:hover {
		color: #0475F4;
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
	.season_checkbox_area {
		display: flex;
		width: 340px;
		height: 90px;
		justify-content: center;
		align-items: center;
		margin: -10px 0 0 285px;
		background-color: #FFF;
		border-radius: 5px;
    z-index: 2;
		box-shadow: 1px 1px 5px -1px #555555;
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
`;
// 검색 카테고리 스타일
const CategoryList = styled.ul`
	position: relative;
	display: inline-block;
	width: 100%;
	align-items: center;
	justify-content: center;
	padding: 5px;
	margin: 7px 0;
`
const CategoryItem = styled.li`
	display: list-item;
	list-style: none;
	float: left;
`
const SearchItem = styled.button`
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
`

const FestivalSearchCategory = (props) => {
	// 지역별 검색 체크박스를 클릭할 때 체크된 지역만 나오게
	const [selectedLocations, setSelectedLocations] = useState([]);
  const checkboxChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setSelectedLocations((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedLocations((prevSelected) =>
        prevSelected.filter((location) => location !== id)
      );
    }
	}

  // 검색 메뉴 Hover 이벤트
	const [isLocationHovered, setLocationIsHovered] = useState(false);
	const [isPeriodHovered, setIsPeriodHovered] = useState(false);
	const [isThemeHovered, setIsThemeHovered] = useState(false);

	const LocationButtonHover = () => {
		setLocationIsHovered(true);
	};
	const LocationButtonLeave = () => {
		setLocationIsHovered(false);
	}

	const PeriodButtonHover = () => {
		setIsPeriodHovered(true);
	}
	const PeriodButtonLeave = () => {
		setIsPeriodHovered(false);
	}

	const ThemeButtonHover = () => {
		setIsThemeHovered(true);
	}
	const ThemeButtonLeave = () => {
		setIsThemeHovered(false);
	}

  // 검색 카테고리 메뉴 클릭 이벤트
	const [isOpenLocation, setIsOpenLocation] = useState(false);
	const [isOpenPeriod, setIsOpenPeriod] = useState(false);
	const [isOpenSeason, setIsOpenSeason] = useState(false);

	// 다른 필터 닫기
	const filterButtonClick = (filterName, isOpenState, setIsOpenState) => {
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
	const [data , setData] = useState("");
	useEffect(() => {
		const getFestivalInfo = async() => {
			const response = await FestivalAPI.getFestivalInfo();

		}

	})
  return (
    <BodyContainer>
    <div className="category_container">
      <CategoryList >
        <CategoryItem>
          <SearchItem
            onClick={() => filterButtonClick('location', isOpenLocation, setIsOpenLocation)}
            onMouseEnter={LocationButtonHover}
            onMouseLeave={LocationButtonLeave}
            style={{color: isOpenLocation || isLocationHovered ? '#0475F4' : 'black'}}
            >@ 지역별 검색</SearchItem>
        </CategoryItem>

        <CategoryItem>
          <SearchItem
            onClick={() => filterButtonClick('period', isOpenPeriod, setIsOpenPeriod)}
            onMouseEnter={PeriodButtonHover}
            onMouseLeave={PeriodButtonLeave}
            style={{color: isOpenPeriod || isPeriodHovered ? '#0475F4' : 'black'}}
          >@ 기간별 검색</SearchItem>
        </CategoryItem>

        <CategoryItem>
          <SearchItem
            onClick={() => filterButtonClick('season', isOpenSeason, setIsOpenSeason)}
            onMouseEnter={ThemeButtonHover}
            onMouseLeave={ThemeButtonLeave}
            style={{color: isOpenSeason || isThemeHovered ? '#0475F4' : 'black'}}
            >@ 계절별 검색</SearchItem>
        </CategoryItem>
      </CategoryList>

      {/* 지역별 검색 */}
      {isOpenLocation && (
        <div className="location_checkbox_area">
					<label htmlFor="서울">
						<div className="location_checkbox">
							<input type="checkbox" id="서울" 
							onChange={checkboxChange}
              checked={selectedLocations.includes("서울")}/>
							<span>서울</span>
						</div>
					</label>
          <label htmlFor="경기도">
						<div className="location_checkbox">
							<input type="checkbox" id="경기도" 
							onChange={checkboxChange}
              checked={selectedLocations.includes("경기도")}/>
							<span>경기도</span>
						</div>
					</label>
          <label htmlFor="강원도">
						<div className="location_checkbox">
							<input type="checkbox" id="강원도" 
							onChange={checkboxChange}
              checked={selectedLocations.includes("강원도")}/>
							<span>강원도</span>
						</div>
					</label>
          <label htmlFor="충청북도">
						<div className="location_checkbox">
							<input type="checkbox" id="충청북도" 
							onChange={checkboxChange}
              checked={selectedLocations.includes("충청북도")}/>
							<span>충청북도</span>
						</div>
					</label>
          <label htmlFor="충청남도">
						<div className="location_checkbox">
							<input type="checkbox" id="충청남도" 
							onChange={checkboxChange}
              checked={selectedLocations.includes("충청남도")}/>
							<span>충청남도</span>
						</div>
					</label>
          <label htmlFor="경상북도">
						<div className="location_checkbox">
							<input type="checkbox" id="경상북도" 
							onChange={checkboxChange}
              checked={selectedLocations.includes("경상북도")}/>
							<span>경상북도</span>
						</div>
					</label>
          <label htmlFor="경상남도">
						<div className="location_checkbox">
							<input type="checkbox" id="경상남도" 
							onChange={checkboxChange}
              checked={selectedLocations.includes("경상남도")}/>
							<span>경상남도</span>
						</div>
					</label>
          <label htmlFor="전라북도">
						<div className="location_checkbox">
							<input type="checkbox" id="전라북도" 
							onChange={checkboxChange}
              checked={selectedLocations.includes("전라북도")}/>
							<span>전라북도</span>
						</div>
					</label>
          <label htmlFor="전라남도">
						<div className="location_checkbox">
							<input type="checkbox" id="전라남도" 
							onChange={checkboxChange}
              checked={selectedLocations.includes("전라남도")}/>
							<span>전라남도</span>
						</div>
					</label>
          <label htmlFor="제주도">
						<div className="location_checkbox">
							<input type="checkbox" id="제주도" 
							onChange={checkboxChange}
              checked={selectedLocations.includes("제주도")}/>
							<span>제주도</span>
						</div>
					</label>
        </div>
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
      )}
    </div>
    </BodyContainer>
  )
}

export default FestivalSearchCategory;