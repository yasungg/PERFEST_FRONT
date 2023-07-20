import React, { useEffect, useState } from "react";
import FestivalAPI from "../api/FestivalAPI";

const { naver } = window;

const NaverMap = () => {
  const [map, setMap] = useState(null);
  const [festivalLocation, setFestivalLocation] = useState([]);

  useEffect(() => {
    const map = document.getElementById('map');
    const options = { center: new naver.maps.LatLng(37.497914, 127.027646), zoom : 15 };
    const navermap = new naver.maps.Map(map, options);
    setMap(navermap);
  },[])

  // const marker = new naver.maps.Marker({
  //   position: new naver.maps.LatLng(37.497914, 127.027646),
  //   map: map
  // });

  const markerOptions = {
    position: new naver.maps.LatLng(37.497914, 127.027646),
    map: map,
    icon: './images/perfesta-marker-removebg2.png'
  };

  const marker = new naver.maps.Marker(markerOptions);

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