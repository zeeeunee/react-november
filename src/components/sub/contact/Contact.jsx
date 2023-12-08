import { useEffect, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const mapFrame = useRef(null);
	const { kakao } = window;
	const mapOption = useRef({ center: new kakao.maps.LatLng(33.450701, 126.570667), level: 3 });

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, mapOption.current);
		const posInstance = new kakao.maps.LatLng(33.450701, 126.570667);
		const markerInstance = new kakao.maps.Marker({
			position: posInstance,
		});
		markerInstance.setMap(mapInstance);
	}, []);
	return (
		<Layout title={'Contact'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
