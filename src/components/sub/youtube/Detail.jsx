import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useParams } from 'react-router-dom';

export default function Detail() {
	const { id } = useParams();
	console.log(id);
	return (
		<Layout title={'Detail'}>
			<h3></h3>
		</Layout>
	);
}
