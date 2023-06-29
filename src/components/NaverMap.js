import React, { useEffect, useState } from "react";

const { naver } = window;

const NaverMap = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = document.getElementById('map');
    const options = { center: new naver.maps.LatLng(37.497914, 127.027646), zoom : 15 };
    const navermap = new naver.maps.Map(map, options);
    setMap(navermap);
},[])

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