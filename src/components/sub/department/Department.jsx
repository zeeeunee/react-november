import { useRef } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';
import { useSelector } from 'react-redux';

//비동기 데이터를 내부적으로 활용하는 컴포넌트에서 너무 빨리 다른 컴포넌트로 이동시
//특정 값이 없다고 뜨면서 memory leak이라는 에러문구 뜨는 현상

//이유: 특정 컴포넌트 마운트시 만약 비동기 데이터 fetching로직이 들어가 있다면, fetching완료하고 해당 값을 state에 담는데 물리적인 시간 필요
//아직 데이터가 fetching요청이 들어가고 데이터반환되기 전에 해당 컴포넌트가 언마운트되면 이미 담을 state는 사라졌는데 fetching요청은 계속 수행되고 있음 (메모리 누수현상 발생)

//해결방법: 해당 컴포넌트에 state를 만들어서 초기값을 false 지정하고
//해당 해당 컴포넌트가 언마운트시 해당 state값을 강제로 true로 변경
//해당 state값이 true일때는 state에 값 담기는 것을 실행되지 않도록 조건문 처리

export default function Department() {
	const MemberData = useSelector(store => store.memberReducer.members);
	const HistoryData = useSelector(store => store.historyReducer.history);

	const path = useRef(process.env.PUBLIC_URL); //public폴더까지의 경로를 구하는 구문
	const changeTitle = useCustomText('title');

	const combinedTitle = useCustomText('combined');

	return (
		<Layout title={'Department'}>
			<section className='historyBox'>
				<h2>{combinedTitle('History')}</h2>
				<div className='con'>
					{/* HistoryData가 반복도는 각각의 데이터 {년도: 배열} */}
					{HistoryData?.map((history, idx) => {
						return (
							<article key={history + idx}>
								{/* 현재 반복돌고 있는 객체의 key값을 뽑아서 h3로 출력 :2016 */}
								<h3>{Object.keys(history)[0]}</h3>
								<ul>
									{/* 현재 반복돌고 있는 객체의 value을 뽑아서 li로 반복출력 [문자열, 문자열]  */}
									{Object.values(history)[0].map((list, idx) => {
										return <li key={list + idx}>{list}</li>;
									})}
								</ul>
							</article>
						);
					})}
				</div>
			</section>
			<section className='memberBox'>
				<h2>{combinedTitle('Members')}</h2>

				<div className='con'>
					{MemberData?.map((member, idx) => {
						return (
							<article key={member + idx}>
								<div className='pic'>
									<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
								</div>
								<h3>{member.name}</h3>
								<p>{member.position}</p>
							</article>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}

/*
	React에서 외부데이터를 가져와서 화면에 동적으로 출력하는 순서
	1. 외부데이터를 가져와서 담을 빈 State추가 (보통 빈배열로 초기화)
	2. fetch문을 이용해서 특정 URL데이터를 가져온뒤 동기적으로 배열로 뽑은 뒤 state에 담아주는 함수 정의
	3. 위에서 만든 함수를 의존성배열이 비어있는 useEffect문 안쪽에서 호출 (다음번 렌더링 타이밍에 State값 활용가능)
	4. State에 담겨있는 데이터 배열값을 map으로 반복 돌면서 JSX구문 생성


	객체의 property에서 key, value값 반복도는 방법
	const student={name:'David',age:20}
	//key반복들면서 배열반환
	Object.keys(student); ['name','age'];
	Object.values(student); ['David',20];


	
//문자열 관련 내장 메서드
	전체문자열.charAt(순서) :전체문자열에서 해당 순서의 문자값만 반환
	전체문자열.slice(순서1, 순서2) : 전체 문자열에서 해당 순서1부터 순서2위치까지 문자를 잘라서 반환
	전체문자열.upperCase() : 문자열을 전체 대문자로 반환
	전체문자열.lowerCase() : 문자열을 전체 소문자로 반환
	전체문자열.split(구분자) : 전체문자열을 구분자를 기준으로 나눠서 배열로 반환
	배열.join('구분자') : 각 배열값을 구분자로 이어붙이면서 하나의 문자열로 반환

*/
