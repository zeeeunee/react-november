import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
	actionType.js
	--문자열인 액션타입명을 재활용하기 편하게 객체형태로 미리 정의한 액션타입 모음집
	store.js
	-- 전역객체 생성, saga미들웨어 추가
	reducer.js
	-- 전역 데이터 변경함수 (기존 리듀서에 비해 pending, fullfiled, rejected에 대한 추가 분기작업)
	api.js
	-- fetching함수를 모아놓은 파일 (컴포넌트 외부에서 비동기데이터 호출함수를 한번에 관리하기 위함)
	saga.js
	-- 리듀서에 전달되는 초기 action타입을 캐치해서 saga자체적으로 데이터호출 및 비동기데이터 상태에따른 액션객체를 만들어서 리듀서에 전달

	redux vs redux-saga작업 흐름비교

	redux
	component (api호출 및 비동기 데이터 반환) 
	-> reducer (비동기 데이터 받아서 전역객체 생성) 
	-> store (전역객체 저장)

	redux-saga
	component (데이터요청 액션초기 타입만 전달) 
	-> reducer (초기요청을 받은뒤 saga에게 작업전달)
	-> saga (api호출 및 비동기 데이터 반환후 새로운 액션객체 생성후 리듀서전달)
	-> reducer (saga로부터 받은 액션객체를 통해서 전역객체 생성) 
	-> store (전역객체 저장)
*/

/*
redux-saga 버전에서의 자가진단 항목
1. 비동기데이터의 fetching함수가 api.js에 등록되어 있고 각 컴포넌트 마운트시 fetching호출이 있는지 확인 (member, history,youtube,flickr)
2. client-side-data 가 saga없이 reducer만으로 전역관리되는지 확인 (modal, menu,dark)
3. Layout.jsx에서 setTimeout안쪽에 참조객체가 optional chaing되어있는지 확인
4. 특정 컴포넌트에서 store로부터 복수개의 reducer를 가져올때 store를 통째로 가져온다음 비구조할당 금지(특정 컴포넌트에 모든 리듀서객체를 다 가져올필요가 없기 때문)
5. 초기 App에서 api.js로 부터 fetching함수 호출시 인수전달되는 값이 있다면 그냥 api.js단에서 내부 default option처리가 효율적 (App에서 모든 dispatch문을 반복문 처리 가능)
*/
