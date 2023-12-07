import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import { ImCancelCircle } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';
import { useCustomText } from '../../../hooks/useText';

export default function Community() {
	//추후에 가져올 시간값에서 -을 .으로 변경하기 위해서 combined타입의 텍스트변환 함수를 텍스트관력 훅으로부터 활성화
	const changeText = useCustomText('combined');
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		//로컬저장소에 post키값에 값이 있으면 parsing 해서 리턴
		if (data) return JSON.parse(data);
		//없으면 그냥 빈 배열을 리턴 (해당 컴포넌트가 젤 처음 호출될때 한번)
		else return [];
	};
	const [Post, setPost] = useState(getLocalData());

	const refTit = useRef(null);
	const refCon = useRef(null);
	console.log(Post);

	//input초기화함수
	const resetPost = () => {
		refTit.current.value = '';
		refCon.current.value = '';
	};
	//글 저장 함수
	const createPost = () => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요.');
		}

		//기존 시간인스턴스값을 한국시에 맞게 변경
		//new Date().toLocalString(): 해당 지역의 표준시로 변환 (단점, 원하지 않는 방향으로 가공됨)
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		//한국시로 변환된 시간 객체값을 date키값에 추가로 등록해서 State에 저장
		setPost([{ title: refTit.current.value, content: refCon.current.value, date: new Date(korTime) }, ...Post]);
		resetPost();
	};
	//글 삭제 함수
	const deletePost = (delIndex) => {
		//console.log(delIndex);
		//기존 map과 마찬가지로 기존 배열값을 deep copy해서 새로운배열 반환
		//이때 안쪽에 조건문을 처리해서 특정 조건에 부합되는 값만 filtering해서 리턴
		if (!window.confirm('정말 해당 게시글을 삭제하겠습니까?')) return;
		setPost(Post.filter((_, idx) => delIndex !== idx));
	};

	const filtering = (txt) => {
		const abc = Post.filter((el) => el.title.indexOf(txt) >= 0 || el.content.indexOf(txt) >= 0);
		console.log(abc);
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<input type='text' placeholder='title' ref={refTit} />
					<textarea cols='30' rows='3' placeholder='content' ref={refCon}></textarea>
					<nav>
						<button onClick={resetPost}>
							<ImCancelCircle />
						</button>
						<button onClick={createPost}>
							<TfiWrite />
						</button>
					</nav>
				</div>
				<div className='showBox'>
					{Post.map((el, idx) => {
						//시간값을 getLocalDate함수를 통해서 시간인스턴스객체값을 객체상태로 그대로 JSX안쪽의 {}에 넣을 수 없으므로
						//변환된 시간 객체값을 다시 강제로 문자화
						const date = JSON.stringify(el.date);
						//문자화시킨 값에서 먼저 T기점으로 앞의 시간문자를 찾고 다시 맨앞의 "를 제외한 나머지 문자 반환(년도-월-일)
						//반환된 문자값을 다시 changeText의 인수로 전달해서 (년도.월.일)로 변환
						const strDate = changeText(date.split('T')[0].slice(1), '.');
						console.log(strDate);
						return (
							<article key={el + idx}>
								<div className='txt'>
									<h2>{el.title}</h2>
									<p>{el.content}</p>
									{/* 변환된 날자값 최종 출력 */}
									<span>{strDate}</span>
								</div>
								<nav>
									<button onClick={() => filtering('a')}>Edit</button>
									<button onClick={() => deletePost(idx)}>Delete</button>
								</nav>
							</article>
						);
					})}
				</div>
			</div>
		</Layout>
	);
}
/*
	1.글입력 박스, 글 출력박스를 생성
	2.전체글을 관리할 배열 state를 생성 [{글정보1}, {글정보2}, {글정보3}]
	3.글입력박스에 글 입력후 저장 버튼 클릭시 글 정보를 객체형태로 state계속 추가 (Create)
	4.state 배열에 추가된값들을 반복돌면서 글 리스트 출력 (Read)
	5.글출력시 삭제, 수정버튼 추가해서 출력
	6.글리스트에서 삭제 버튼 클릭시 배열State에서 이벤트가 발생한 순번의 객체를 제거해서 글삭제 (Delete)
	Create (데이터저장) 글작성
	Read (데이터호출) 글목록 보기
	Update (데이터변경) 글 수정
	Delete (데이터삭제) 글 삭제

	localStorage :모든 브라우저가 내장하고 있는 경량의 저장소
	--문자값만 저장가능(5MB)
	--로컬저장소에 문자열이외의 값을 저장할때에는 강제로 문자화시켜서 저장
	--로컬저장소의 값을 JS로 가져올때에는 문자값을 반대로 객체화시켜서 호출

	localStorage객체에 활용가능한 메서드
	-setItem('키','문자화된 데이터');
	-getItem('키') 해당 키값에 매칭이 되는 데이터를 가져옴
*/
