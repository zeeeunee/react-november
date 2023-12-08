import { useEffect, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const mapFrame = useRef(null);
	const { kakao } = window;
	const mapOption = useRef({ center: new kakao.maps.LatLng(37.511553, 127.022009), level: 3 });

	const imageSrc = process.env.PUBLIC_URL + `/img/marker1.png`;
	const imageSize = new kakao.maps.Size(242, 99);
	const imageOption = { offset: new kakao.maps.Point(116, 99) };

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, mapOption.current);
		const markerImageInstance = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
		const posInstance = mapOption.current.center;
		const markerInstance = new kakao.maps.Marker({
			position: posInstance,
			image: markerImageInstance,
		});
		markerInstance.setMap(mapInstance);
	}, []);
	return (
		<Layout title={'Contact'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
