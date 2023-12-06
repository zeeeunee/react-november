import { useRef, useState } from 'react';
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
		setPost([{ title: refTit.current.value, content: refCon.current.value }, ...Post]);
	};
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
*/
