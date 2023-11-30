import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect } from 'react';

export default function Youtube() {
	const [Vids, setVids] = useState([]);

	//promise then 구문을 async await 변경하기 위한 조건 2가지
	//조건1 - promise반환 함수를 감싸주는 wrapping함수 필요 (async)
	//조건2 - await문은 promise반환함수에만 지정가능

	const fetchYoutube = async () => {
		const api_key = 'AIzaSyBQ0OBVJR5LwVP7O1wFRSbfMbLCLvWRLnE';
		const pid = 'PLM7Wu-2kzIQNKIs1hkRrlcXbwun3W_hWg';
		const num = 5;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		// fetch(baseURL)
		// 	.then((data) => data.json())
		// 	.then((json) => {
		// 		setVids(json.items);
		// 	});
		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			setVids(json.items);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return <Layout title={'Youtube'}>Youtube</Layout>;
}
