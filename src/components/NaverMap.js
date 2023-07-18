import React, { useEffect, useState } from "react";


const { naver } = window;
const { number } = window;

const NaverMap = () => {
  const [xVal, setXVal] = useState(37.497914);
  const [yVal, setYVal] = useState(127.027646);

  const [map, setMap] = useState(null);

  useEffect(() => {


    // 지도 생성 시 옵션
    const position = new naver.maps.LatLng(xVal, yVal); // 지도 중심위치 설정
    const mapOptions = {
        center: position, // 맵 렌더링시 지도의 초기 중심 좌표, position 대신 new naver.maps.LatLng(위경도값);
        zoom: 17, // 지도의 초기 줌 레벨
        minZoom: 10, // 지도의 최소 줌 레벨
        zoomControl: true, // 줌 컨트롤의 표시 여부
        zoomControlOptions: { // 줌 컨트롤의 옵션
        position: naver.maps.Position.TOP_RIGHT,
        },
    };

    // 지도를 삽입할 HTML 요소 또는 HTML 요소의 id를 지정
    // 밑에서 const map = new naver.maps.Map(document.getElementById("map"), mapOptions); 로
    // 구현했지만, 변수로 사용해도 상관없음
    // const container = document.getElementById("map");
    const map = new naver.maps.Map(document.getElementById("map"), mapOptions);

    // 지도에서 마커 구현
    const marker = new naver.maps.Marker({
      // 지도 초기 중심 좌표와 일치하게 하기 위해서 같은 위치 지정하는 position 변수 재사용
      position: position, 
      map: map
    });
    
    // // 위도, 경도 찾으려는 주소를 query 안에 지정하면 status에 상태와 response 에 검색 결과 컨테이너를 가져온다.
    // naver.maps.Service.geocode({ query: children }, function(status, response) {
    //   // 올바른 상태값이 리턴되지 않으면 오류발생
    //   if (status !== naver.maps.Service.Status.OK) {
    //       return alert('지도 로딩 실패!');
    //   };

    // // 성공적으로 response 값을 가져오면 위도, 경도값을 바꾼다.
    // setXVal(response.v2.addresses[0].y);
    // setYVal(response.v2.addresses[0].x);
    // });
  },[xVal, yVal]);


const marker = new naver.maps.Marker({
    position: new naver.maps.LatLng(37.497914, 127.027646),
    map: map
});

// 	const [myLocation, setMyLocation] = useState<
// 		{ latitude: number, longitude: number } | 'string'
// 	>("");

// 	// 현재 위치 받아오기
// 	useEffect(() => {
// 		if(navigator.geolocation) {
// 			navigator.geolocation.getCurrentPosition((position) => {
// 				setMyLocation({
// 					latitude: position.coords.latitude,
// 					longitude: position.coords.longitude
// 				});
// 			});
// 		} else {
// 			window.alert("현재 위치를 알 수 없습니다.")
// 		}
// 	}, []);	

// 	useEffect(() => {
// 		if(typeof myLocation !== "string") {
// 			const currentPosition = [myLocation.latitude, myLocation.longitude];

// 			const map = new naver.maps.Map("map", {
// 				center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
// 				zoomControl: true
// 			});
// 		}
// 	}, [myLocation]);

// // 내 위치 마커 표시하기
// useEffect(() => {
// 	if (typeof myLocation !== "string") {
// 		const currentPosition = [myLocation.latitude, myLocation.longitude];

// 		const map = new naver.maps.Map("map", {
// 				center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
// 				zoomControl: true,
// 		});
// 			const currentMarker = new naver.maps.Marker({
// 				position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
// 				map,
// 				// 원하는 이미지로 마커 커스텀
// 				// icon: {
// 				//     url: pinImage,
// 				//     size: new naver.maps.Size(50, 52),
// 				//     origin: new naver.maps.Point(0, 0),
// 				//     anchor: new naver.maps.Point(25, 26),
// 				//   },
// 			});
// 		}
// 	}, [myLocation]);

	return (
    <div
        style={{
            width: '100%',
            height: '100%',
        }}
    >
        <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
	);
};
export default NaverMap;