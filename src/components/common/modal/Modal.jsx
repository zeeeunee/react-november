import './Modal.scss';

export default function Modal({ Open, setOpen, children }) {
	return (
		<>
			{Open && (
				<aside className='Modal'>
					<div className='con'>{children}</div>
					<span onClick={() => setOpen(false)}>close</span>
				</aside>
			)}
		</>
	);
}
