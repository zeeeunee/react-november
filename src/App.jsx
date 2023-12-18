import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import { Route } from 'react-router-dom';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';
import * as types from './redux/action';

export default function App() {
	//순서2 - dispatch함수를 활성화 (추후 fetching된 데이터를 액션에 담아서 리듀서에게 전달하기 위함)
	const dispatch = useDispatch();
	const path = useRef(process.env.PUBLIC_URL);
	const [Dark, setDark] = useState(false);

	//순서3 - fetching된 데이터값을 받아서 액션객체에 담은 뒤 dispatch로 리듀서에 전달하는 함수를 정의
	const fetchDepartment = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		dispatch({ type: 'types.MEMBER.success', payload: json.members });
	}, [dispatch]);

	const fetchHistory = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/history.json`);
		const json = await data.json();
		dispatch({ type: 'types.HISTORY.success', payload: json.history });
	}, [dispatch]);

	const fetchYoutube = useCallback(async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;
		const num = 6;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			dispatch({ type: types.YOUTUBE.success, payload: json.items });
		} catch (err) {
			dispatch({ type: types.YOUTUBE.fail, payload: err });
		}
	}, [dispatch]);
	//순서4 - 컴포넌트가 처음 마운트 되었을때 함수를 호출해서 비동기 데이터를 리듀서에 전달
	//render1 : 전역 store의 값은 빈배열
	//render2 : 그때 비로서 각 컴포넌트에서 useSelector에 해당 비동기 데이터를 접근 가능
	useEffect(() => {
		fetchDepartment();
		fetchHistory();
		fetchYoutube();
	}, [fetchDepartment, fetchHistory, fetchYoutube]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header Dark={Dark} setDark={setDark} />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/detail/:id' component={Detail} />
			<Footer />
			<Menu />
		</div>
	);
}

/*
	1.reducer, store, app으로의 데이터 전달 흐름 이해
	2.reducer가 하는 역할
	3.action객체가 필요한 이유
	4.컴포넌트에서 데이터 호출 및 데이터 변경 요청을 위한 useSelector, useDispatch
	5.App에서 fetching후 action객체를 통해 dispatch로 reducer에 데이터 변경요청 흐름
	6.action타입을 따로 객체형태로 관리하는 이유
*/
