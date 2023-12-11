import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const { kakao } = window;

	//화면에 출력될 지도정보 배열의 순번이 담길 state
	const [Index, setIndex] = useState(0);
	const mapFrame = useRef(null);
	const marker = useRef(null);

	//지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
	const mapInfo = useRef([
		{
			title: '삼성역 코엑스',
			latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	]);

	//마커 인스턴스 생성
	marker.current = new kakao.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.maps.MarkerImage(mapInfo.current[Index].imgSrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgOpt),
	});

	//컴포넌트 마운트시 참조객체에 담아놓은 돔 프레임에 지도 인스턴스 출력 및 마커 세팅
	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3,
		});
		marker.current.setMap(mapInstance);
	}, [Index, kakao]);

	return (
		<Layout title={'Contact'}>
			<ul className='branch'>
				{mapInfo.current.map((el, idx) => (
					<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
						{el.title}
					</button>
				))}
			</ul>
			<article className='mapBox' ref={mapFrame}></article>
		</Layout>
	);
}
