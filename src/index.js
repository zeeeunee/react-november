import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './redux/youtubeSlice';
import memberReducer from './redux/memberSlice';
import historyReducer from './redux/historySlice';
import flickrReducer from './redux/flickrSlice';
import modalReducer from './redux/modalSlice';
import menuReducer from './redux/menuSlice';
import darkReducer from './redux/darkSlice';

//리듀서 객체값 하나로 묶어서 store생성
const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		member: memberReducer,
		history: historyReducer,
		flickr: flickrReducer,
		modal: modalReducer,
		menu: menuReducer,
		dark: darkReducer
	}
});

ReactDOM.render(
	<BrowserRouter>
		{/* 전역 객체 APP에 전달 */}
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

//npm i @reduxjs/toolkit react-redux

/*
리덕스 비동기 데이터의 효율적 처리를 위한 대표적인 미들웨어 2가지
redux-saga
--action객체의 변화를 감시하면서 적절한 상태 변화 시점에 액션객체를 생성해서 리듀서에 전달하는 미들웨어(generator)

redux-thunk
--함수자체를 리듀서에 전달하게 해주는 미들웨어 해당함수가 자동으로 액션객체를 반환하도록 처리

redux-toolkit이라는 thunk기반의 통합 전역관리 패키지가 나오게 된 개념
--초반에는 액션객체를 중앙집중적으로 관리하면서 리듀서에 전달하는 방식이 thunk방식에 비해서 기존 리덕스를 사용하는 개발자에게 더 친숙해서 saga를 많이 쓰게 됐는데
문제는 saga방식으로 하다 보니까 관리할 파일의 개수가 많아지고 코드 관리가 어려워져서 
데이터 카테고리별로 전역관리할 비동기 데이터를 분리할 필요가 생김
이 시점에 불편했던 thunk방식 코드를 개선할 redux-toolkit이라는 통합라이브러리 등장
--redux-toolkit의 장점: 데이터별로 전역상태관리 파일을 분리할 수 있고,
사용자가 직접 데이터상태별로 액션타입을 만들필요가 없도록 자동생성됨
하나의 슬라이스파일안에 api함수와 reducer함수를 간결한 문법으로 관리가능
*/
