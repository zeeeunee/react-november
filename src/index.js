import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	--redux---
	store : 어떤 컴포넌트에서든 자유롭게 데이터를 공유할 수 있게 컴포넌트 외부에 있는 독립적인 전역 데이터 공간
	reducer : store에 변경될 데이터를 전달해주는 변형자함수 (action객체를 받아야지만 store에 변경요청 가능)
	action : 컴포넌트가 리듀서에 변경요청을 의뢰할때 필요한 특별한 형태의 객체 {type: '타입', payload:'데이터'}
	dispatch : 컴포넌트에서 action객체를 전달할때는 무조건 dispatch를 통해서만 전달 가능
	selector : 컴포넌트에서 전역 store의 데이터 요청할때는 무조건 selector를 통해서만 호출 가능
*/
