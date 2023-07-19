import React, { useEffect, useState } from "react";
import { Container as MapDiv, Marker, useNavermaps, Overlay, useMap } from 'react-naver-maps'
import accidentDeath from "../App"

const { naver } = window;
const { number } = window;

const NaverMap = () => {
  const [xVal, setXVal] = useState(37.497914);
  const [yVal, setYVal] = useState(127.027646);

  const [map, setMap] = useState(null);
  



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

// useEffect(() => {

    
//   // 지도 생성 시 옵션
//   const position = new naver.maps.LatLng(xVal, yVal); // 지도 중심위치 설정
//   const mapOptions = {
//       center: position, // 맵 렌더링시 지도의 초기 중심 좌표, position 대신 new naver.maps.LatLng(위경도값);
//       zoom: 17, // 지도의 초기 줌 레벨
//       minZoom: 10, // 지도의 최소 줌 레벨
//       zoomControl: true, // 줌 컨트롤의 표시 여부
//       zoomControlOptions: { // 줌 컨트롤의 옵션
//       position: naver.maps.Position.TOP_RIGHT,
//       },
//   };

//   // 지도를 삽입할 HTML 요소 또는 HTML 요소의 id를 지정
//   // 밑에서 const map = new naver.maps.Map(document.getElementById("map"), mapOptions); 로
//   // 구현했지만, 변수로 사용해도 상관없음
//   // const container = document.getElementById("map");
//   const map = new naver.maps.Map(document.getElementById("map"), mapOptions);

//   // 지도에서 마커 구현
//   const marker = new naver.maps.Marker({
//     // 지도 초기 중심 좌표와 일치하게 하기 위해서 같은 위치 지정하는 position 변수 재사용
//     position: position, 
//     map: map
//   });
  
// },[xVal, yVal]);


// const marker = new naver.maps.Marker({
//   position: new naver.maps.LatLng(37.497914, 127.027646),
//   // map: map
// });



  
function MarkerCluster() {
  // https://github.com/navermaps/marker-tools.js/blob/master/marker-clustering/src/MarkerClustering.js
  // 예제에서 제공된 코드를 그대로 사용하되 naver 객체를 주입 받도록 간단히 makeMarkerClustering로 Wrapping 합니다.

  const navermaps = useNavermaps()
  const map = useMap()

  // https://github.com/zeakd/react-naver-maps/blob/main/website/src/samples/marker-cluster.js
  const MarkerClustering = MarkerClustering(window.naver)

  const htmlMarker1 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-1.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  }
  const htmlMarker2 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-2.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  }
  const htmlMarker3 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  }
  const htmlMarker4 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  }
  const htmlMarker5 = {
    content:
      '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>',
    size: navermaps.Size(40, 40),
    anchor: navermaps.Point(20, 20),
  }

  // https://navermaps.github.io/maps.js.ncp/docs/data/accidentdeath.js
  const data = accidentDeath.searchResult.accidentDeath

  // Customize Overlay 참고
  // https://zeakd.github.io/react-naver-maps/guides/customize-overlays/
  const [cluster] = useState(() => {
    const markers = []

    for (var i = 0, ii = data.length; i < ii; i++) {
      var spot = data[i],
        latlng = new naver.maps.LatLng(spot.grd_la, spot.grd_lo),
        marker = new naver.maps.Marker({
          position: latlng,
          draggable: true,
        })

      markers.push(marker)
    }

    const cluster = new MarkerClustering({
      minClusterSize: 2,
      maxZoom: 8,
      map: map,
      markers: markers,
      disableClickZoom: false,
      gridSize: 120,
      icons: [
        htmlMarker1,
        htmlMarker2,
        htmlMarker3,
        htmlMarker4,
        htmlMarker5,
      ],
      indexGenerator: [10, 100, 200, 500, 1000],
      stylingFunction: function (clusterMarker, count) {
        // without jquery $(clusterMarker.getElement()).find('div:first-child').text(count)
        clusterMarker
          .getElement()
          .querySelector('div:first-child').innerText = count
      },
    })

    return cluster
  })

  return <Overlay element={cluster} />
}

function MyMap() {
  const navermaps = useNavermaps()

  return (
    <NaverMap
      zoom={6}
      center={new navermaps.LatLng(36.2253017, 127.6460516)}
      zoomControl={true}
      zoomControlOptions={{
        position: navermaps.Position.TOP_LEFT,
        style: navermaps.ZoomControlStyle.SMALL,
      }}
    >
      <MarkerCluster />
    </NaverMap>
  )
}

<MapDiv
  style={{
    width: '100%',
    height: 600,
  }}
>
  <MyMap />
</MapDiv>