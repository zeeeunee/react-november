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

import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useGlobalData } from './hooks/useGlobalData';

function App() {
	const queryClient = new QueryClient();
	const { Dark } = useGlobalData();

	return (
		<QueryClientProvider client={queryClient}>
			<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
				<Header />
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
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;

/*
	react-query 개념정리 (server-side-data 관리)
	: server-side-data를 static한 상태로 전역객체(global context)에 물리적으로 저장하는 것이 아닌
	: 서버쪽 데이터가 필요할때마다 호출해서 항상 최신상태의 서버데이터 사용을 위한 라이브러리
	: 쿼리키를 통해서 특정 fetching된 promise 리턴값을 매핑해서 서버요청시 동일한 쿼리키에 이미 매핑된 데이터가 있으면 refetching하지 않음
	: 쿼리키로 초기 데이터 매핑시 cacheTime(GC Time), staleTime을 지정해서 서버데이터의 캐시저장 시간 및 refetching금지 시간 지정
	
	react-query 작업순서
	1. index 혹은 App 컴포넌트에서 쿼리 클라이언트 인스턴스 생성후 Provider를 통해서 전역 전달 (모든 컴포넌트에서 등록된 쿼리키 공유가능)
	2. fetching func, 쿼리키를 등록하는 커스텀훅  생성 (cacheTime, staleTime 및 서버쿼리 관련 옵션 지정)
	3. 비동기 데이터가 필요한 컴포넌트에서 커스텀훅 호출 및 반환하는 객체의 property값을 사용 (data, isSuccess, isError, isLoading)
	
	react-query 사용시의 이점
	1. 서버데이터를 위한 useState, useEffect, useCallback등의 훅사용 불필요
	2. 한번 fetching한 내역이 있는 데이터는 쿼리키가 동일하다는 전제하에서 cache에 등록된 값 재활용 및 불필요한 서버요청 하지 않음
	3. 쿼리옵션에 따라서 항상 최신의 서버데이터를 핸들링 가능
	
	context api를 활용한 전역데이터관리 커스텀훅 (client-side-data 관리)
	: 복잡한 서버데이터는 이미 react-query가 관리하고 있으므로 간단한 client-side-data를 굳이 redux같은 외부 라이브러리 관리 불필요
	: react에 기본 내장되어 있는 context api기반의 createContext, useContext를 이용한 커스텀훅 사용
	
	context api기반 커스텀 훅 작업순서
	1. createContext로 전역 context생성(store개념)
	2. 전역 context에 내장되어 있는 Provider로 App을 감싸고 전역으로 관리할 State전달
	3. 자식 컴포넌트에서는 useContext를 활용해서 자유롭게 전역 context값 접근 가능
*/
