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
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';

export default function App() {
	//순서2 - dispatch함수를 활성화 (추후 fetching된 데이터를 액션에 담아서 리듀서에게 전달하기 위함)
	const dispatch = useDispatch();
	const path = useRef(process.env.PUBLIC_URL);
	const [Dark, setDark] = useState(false);
	const [Toggle, setToggle] = useState(false);

	//순서3 - fetching된 데이터값을 받아서 액션객체에 담은 뒤 dispatch로 리듀서에 전달하는 함수를 정의
	const fetchDepartment = () => {
		fetch(`${path.current}/DB/department.json`)
			.then(data => data.json())
			.then(json => {
				console.log(json.members);
				dispatch({ type: 'SET_MEMBERS', payload: json.members });
			});
	};

	//순서4 - 컴포넌트가 처음 마운트 되었을때 함수를 호출해서 비동기 데이터를 리듀서에 전달
	//render1 : 전역 store의 값은 빈배열
	//render2 : 그때 비로서 각 컴포넌트에서 useSelector에 해당 비동기 데이터를 접근 가능
	useEffect(() => fetchDepartment(), []);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header Dark={Dark} setDark={setDark} Toggle={Toggle} setToggle={setToggle} />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />

			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/detail/:id' component={Detail} />
			<Footer />
			{Toggle && <Menu setToggle={setToggle} />}
		</div>
	);
}
