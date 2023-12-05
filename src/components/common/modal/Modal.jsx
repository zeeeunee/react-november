import './Modal.scss';

export default function Modal({ setOpen, children }) {
	return (
		<aside className='Modal'>
			<div className='con'>{children}</div>
			<span onClock={() => setOpen(false)}>close</span>
		</aside>
	);
}
