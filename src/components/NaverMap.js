import React, { useEffect, useState } from "react";
import FestivalAPI from "../api/FestivalAPI";

const { naver } = window;

const NaverMap = ({data}) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = document.getElementById('map');
    const options = { center: new naver.maps.LatLng(37.497914, 127.027646), zoom : 15 };
    const navermap = new naver.maps.Map(map, options);
    setMap(navermap);
  },[])

  useEffect(() => {
    if (map && data && data.length > 0) {
      // 이전에 있던 마커들을 모두 삭제
      naver.maps.Event.removeListener(map, 'click');
      map.marks.forEach(marker => marker.setMap(null));

      // data 배열에 있는 모든 위치에 마커 생성
      const markers = data.map(item => {
        const markerOptions = {
          position: new naver.maps.LatLng(item.latitude, item.longitude),
          map: map,
          icon: './images/kakaoButton.png',
        };
        return new naver.maps.Marker(markerOptions);
      });

      // 마커를 클릭했을 때 이벤트 리스너 등록 (옵션)
      markers.forEach((marker, index) => {
        naver.maps.Event.addListener(marker, 'click', () => {
          // 클릭한 마커에 대한 처리 (예: 정보 보여주기 등)
          console.log('Clicked Marker:', data[index]);
        });
      });

      // 생성된 마커들을 map 객체에 저장하여 추후에 제거 가능하도록
      map.marks = markers;
    }
  },[data, map]);
  // const marker = new naver.maps.Marker({
  //   position: new naver.maps.LatLng(37.497914, 127.027646),
  //   map: map
  // });

  // const markerOptions = {
  //   position: new naver.maps.LatLng(37.497914, 127.027646),
  //   map: map,
  //   icon: './images/kakaoButton.png'
  // };

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

  // const marker = new naver.maps.Marker(markerOptions);

  // useEffect(() => {
  //   if(map && festivalLocation.length > 0) {
  //     naver.maps.Event.removeListener(map, "click");

  //     festivalLocation.forEach((festival) => {
  //       const marker = new naver.maps.Marker({
  //         position: new naver.maps.LatLng(festival.wedo, festival.kyungdo),
  //         map: map
  //       });

  //       naver.map.Event.addListener(marker, "click", () => {
  //         console.log("클릭한 마커의 ID : ", festival.id);
  //       });
  //     });
  //   }
  // }, [map, festivalLocation]);