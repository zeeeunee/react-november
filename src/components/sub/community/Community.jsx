import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import { ImCancelCircle } from 'react-icons/im';
import { TfiWrite } from 'react-icons/tfi';
export default function Community() {
	const [Post, setPost] = useState([]);
	const refTit = useRef(null);
	const refCon = useRef(null);
	console.log(Post);
	const resetPost = () => {
		refTit.current.value = '';
		refCon.current.value = '';
	};
	const createPost = () => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		setPost([{ title: refTit.current.value, content: refCon.current.value }, ...Post]);
		resetPost();
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
						return (
							<article key={el + idx}>
								<div className='txt'>
									<h2>{el.title}</h2>
									<p>{el.content}</p>
								</div>
								<nav>
									<button>Edit</button>
									<button>Delete</button>
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
